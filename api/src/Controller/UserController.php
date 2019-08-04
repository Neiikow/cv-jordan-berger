<?php

namespace App\Controller;

use App\Entity\Users;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\ConstraintViolationList;
use App\Exception\ResourceValidationException;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityRepository;

class UserController extends FOSRestController
{
    /**
     * @Rest\Get(
     *    path = "/api/users/view/{id}",
     *    name = "user_id",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function viewId($id)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository(Users::class)->find($id);

        if (!$user) {
            throw $this->createNotFoundException(
                'Utilisateur introuvable'
            );
        }

        $data = [
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
            'picture' => $user->getPicture(),
            'city' => $user->getCity(),
            'street' => $user->getStreet(),
            'postal' => $user->getPostal(),
            'phone' => $user->getPhone(),
            'about' => $user->getAbout(),
            'age' => $user->getAge(),
        ];

        return $data;
    }

    /**
     * @Rest\Post(
     *    path = "/api/register",
     *    name = "register"
     * )
     * @Rest\View(StatusCode = 201)
     * @ParamConverter("user", converter="fos_rest.request_body")
     */
    public function register(UserPasswordEncoderInterface $passwordEncoder, Users $user, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            foreach ($violations as $violation) {
                $message = sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }
            throw new ResourceValidationException($message);
        }
        $encodedPassword = $passwordEncoder->encodePassword($user, $user->getPassword());
        $user->setPassword($encodedPassword);

        try {
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
            return $this->view(
                $user,
                Response::HTTP_CREATED,
                ['Location' =>$this->generateUrl(
                    'user_id',
                    ['id' => $user->getId()])
                ]
            );
        }
        catch(UniqueConstraintViolationException $e) {
            throw $this->createNotFoundException(
                'Pseudo ou adresse Email déjà utilisés !'
            );
        }
    }

    /**
     * @Rest\Post(
     *    path = "/api/edit/{id}",
     *    name = "edit",
     *    requirements = {"id"="\d+"}
     * )
     * @ParamConverter("user", converter="fos_rest.request_body")
     */
    public function edit(UserPasswordEncoderInterface $passwordEncoder, Users $user, $id, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            foreach ($violations as $violation) {
                $message = sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }
            throw new ResourceValidationException($message);
        }

        $em = $this->getDoctrine()->getManager();
        $data = $em->getRepository(Users::class)->find($id);

        $data->setUsername($user->getUsername());
        $data->setEmail($user->getEmail());
        $data->setRoles($user->getRoles());

        if ($user->getPassword()) {
            $encodedPassword = $passwordEncoder->encodePassword(
                $user,
                $user->getPassword()
            );
            $data->setPassword($encodedPassword);
        } else {
            $user->setPassword($data->getPassword());
        }
        if ($user->getPicture()) {
            $data->setPicture($user->getPicture());
        }
        //$jwtManager = $this->container->get('lexik_jwt_authentication.jwt_manager');
        //$token = $jwtManager->create($data);

        try {
            $em->flush();
            $msg = [
                'content' => 'Profil édité !'
                //'token' => $token
            ];
            return $this->json(
                $msg,
                Response::HTTP_CREATED,
                ['Location' =>$this->generateUrl(
                    'user_id',
                    ['id' => $data->getId()])
                ]
            );
        }
        catch(UniqueConstraintViolationException $e) {
            throw $this->createNotFoundException(
                'Pseudo ou adresse Email déjà utilisés !'
            );
        }
    }
}
