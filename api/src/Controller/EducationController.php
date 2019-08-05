<?php

namespace App\Controller;

use App\Entity\Education;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\ConstraintViolationList;
use App\Exception\ResourceValidationException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

class EducationController extends FOSRestController
{
    /**
     * @Rest\Post(
     *    path = "/api/admin/education/new",
     *    name = "education_create"
     * )
     * @Rest\View(StatusCode = 201)
     * @ParamConverter("education", converter="fos_rest.request_body")
     */
    public function new(Education $education, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            $message = 'Le JSON envoyé contient des données non valides.';
            foreach ($violations as $violation) {
                $message .= sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }
            throw new ResourceValidationException($message);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($education);
        $em->flush();

        return $this->view(
            $education,
            Response::HTTP_CREATED,
            ['Location' =>$this->generateUrl(
                'education_id',
                ['id' => $education->getId()])
            ]
        );
    }

    /**
     * @Rest\Post(
     *    path = "/api/admin/education/edit/{id}",
     *    name = "education_edit",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     * @ParamConverter("education", converter="fos_rest.request_body")
     */
    public function edit($id, Education $education, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            $message = 'Le JSON envoyé contient des données non valides.';
            foreach ($violations as $violation) {
                $message .= sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }
            throw new ResourceValidationException($message);
        }

        $em = $this->getDoctrine()->getManager();
        $data = $em->getRepository(Education::class)->find($id);        

        if (!$data) {
            throw $this->createNotFoundException(
                'Ressource introuvable'
            );
        }

        $data->setTitle($education->getTitle());
        $data->setCompany($education->getCompany());
        $data->setIsdev($education->getIsdev());

        $em->flush();

        return $data;
    }

    /**
     * @Rest\Delete(
     *    path = "/api/admin/education/delete/{id}",
     *    name = "education_delete",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function delete($id)
    {
        $em = $this->getDoctrine()->getManager();
        $education = $em->getRepository(Education::class)->find($id);

        if (!$education) {
            throw $this->createNotFoundException(
                'Ressource introuvable'
            );
        }

        $em->remove($education);
        $em->flush();

        return $education;
    }
    
    /**
     * @Rest\Get(
     *    path = "/api/education/view/{id}",
     *    name = "education_id",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function showId($id)
    {
        $em = $this->getDoctrine()->getManager();
        $education = $em->getRepository(Education::class)->find($id);

        if (!$education) {
            throw $this->createNotFoundException(
                'Ressource introuvable'
            );
        }
        return $education;
    }

    /**
     * @Rest\Get(
     *    path = "/api/education",
     *    name = "education_list",
     * )
     * @Rest\View
     */
    public function showAll()
    {
        $education = $this->getDoctrine()->getRepository('App:Education')->findAll();

        return $education;
    }
}
