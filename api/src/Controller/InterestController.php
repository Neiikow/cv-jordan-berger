<?php

namespace App\Controller;

use App\Entity\Interest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\ConstraintViolationList;
use App\Exception\ResourceValidationException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

class InterestController extends FOSRestController
{
    /**
     * @Rest\Post(
     *    path = "/api/admin/interest/new",
     *    name = "interest_create"
     * )
     * @Rest\View(StatusCode = 201)
     * @ParamConverter("interest", converter="fos_rest.request_body")
     */
    public function new(Interest $interest, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            $message = 'Le JSON envoyé contient des données non valides.';
            foreach ($violations as $violation) {
                $message .= sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }
            throw new ResourceValidationException($message);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($interest);
        $em->flush();

        return $this->view(
            $interest,
            Response::HTTP_CREATED,
            ['Location' =>$this->generateUrl(
                'interest_id',
                ['id' => $interest->getId()])
            ]
        );
    }

    /**
     * @Rest\Post(
     *    path = "/api/admin/interest/edit/{id}",
     *    name = "interest_edit",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     * @ParamConverter("interest", converter="fos_rest.request_body")
     */
    public function edit($id, Interest $interest, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            $message = 'Le JSON envoyé contient des données non valides.';
            foreach ($violations as $violation) {
                $message .= sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }
            throw new ResourceValidationException($message);
        }

        $em = $this->getDoctrine()->getManager();
        $data = $em->getRepository(Interest::class)->find($id);        

        if (!$data) {
            throw $this->createNotFoundException(
                'Ressource introuvable'
            );
        }

        $data->setTitle($interest->getTitle());
        $data->setDetails($interest->getDetails());

        $em->flush();

        return $data;
    }

    /**
     * @Rest\Delete(
     *    path = "/api/admin/interest/delete/{id}",
     *    name = "interest_delete",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function delete($id)
    {
        $em = $this->getDoctrine()->getManager();
        $interest = $em->getRepository(Interest::class)->find($id);

        if (!$interest) {
            throw $this->createNotFoundException(
                'Ressource introuvable'
            );
        }

        $em->remove($interest);
        $em->flush();

        return $interest;
    }
    
    /**
     * @Rest\Get(
     *    path = "/api/interest/view/{id}",
     *    name = "interest_id",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function showId($id)
    {
        $em = $this->getDoctrine()->getManager();
        $interest = $em->getRepository(Interest::class)->find($id);

        if (!$interest) {
            throw $this->createNotFoundException(
                'Ressource introuvable'
            );
        }
        return $interest;
    }

    /**
     * @Rest\Get(
     *    path = "/api/interest",
     *    name = "interest_list",
     * )
     * @Rest\View
     */
    public function showAll()
    {
        $interest = $this->getDoctrine()->getRepository('App:Interest')->findAll();

        return $interest;
    }
}
