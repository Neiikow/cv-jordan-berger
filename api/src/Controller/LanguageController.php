<?php

namespace App\Controller;

use App\Entity\Language;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\ConstraintViolationList;
use App\Exception\ResourceValidationException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

class LanguageController extends FOSRestController
{
    /**
     * @Rest\Post(
     *    path = "/api/language/new",
     *    name = "language_create"
     * )
     * @Rest\View(StatusCode = 201)
     * @ParamConverter("language", converter="fos_rest.request_body")
     */
    public function new(Language $language, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            $message = 'Le JSON envoyé contient des données non valides.';
            foreach ($violations as $violation) {
                $message .= sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }
            throw new ResourceValidationException($message);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($language);
        $em->flush();

        return $this->view(
            $language,
            Response::HTTP_CREATED,
            ['Location' =>$this->generateUrl(
                'language_id',
                ['id' => $language->getId()])
            ]
        );
    }

    /**
     * @Rest\Post(
     *    path = "/api/language/edit/{id}",
     *    name = "language_edit",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     * @ParamConverter("language", converter="fos_rest.request_body")
     */
    public function edit($id, Language $language, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            $message = 'Le JSON envoyé contient des données non valides.';
            foreach ($violations as $violation) {
                $message .= sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }
            throw new ResourceValidationException($message);
        }

        $em = $this->getDoctrine()->getManager();
        $data = $em->getRepository(Language::class)->find($id);        

        if (!$data) {
            throw $this->createNotFoundException(
                'Ressource introuvable'
            );
        }

        $data->setName($language->getName());

        $em->flush();

        return $data;
    }

    /**
     * @Rest\Delete(
     *    path = "/api/language/delete/{id}",
     *    name = "language_delete",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function delete($id)
    {
        $em = $this->getDoctrine()->getManager();
        $language = $em->getRepository(Language::class)->find($id);

        if (!$language) {
            throw $this->createNotFoundException(
                'Ressource introuvable'
            );
        }

        $em->remove($language);
        $em->flush();

        return $language;
    }
    
    /**
     * @Rest\Get(
     *    path = "/api/language/view/{id}",
     *    name = "language_id",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function showId($id)
    {
        $em = $this->getDoctrine()->getManager();
        $language = $em->getRepository(Language::class)->find($id);

        if (!$language) {
            throw $this->createNotFoundException(
                'Ressource introuvable'
            );
        }
        return $language;
    }

    /**
     * @Rest\Get(
     *    path = "/api/language",
     *    name = "language_list",
     * )
     * @Rest\View
     */
    public function showAll()
    {
        $language = $this->getDoctrine()->getRepository('App:Language')->findAll();

        return $language;
    }
}
