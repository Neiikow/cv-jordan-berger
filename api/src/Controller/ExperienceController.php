<?php

namespace App\Controller;

use App\Entity\Experience;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\ConstraintViolationList;
use App\Exception\ResourceValidationException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

class ExperienceController extends FOSRestController
{
    /**
     * @Rest\Post(
     *    path = "/api/admin/experience/new",
     *    name = "experience_create"
     * )
     * @Rest\View(StatusCode = 201)
     * @ParamConverter("experience", converter="fos_rest.request_body")
     */
    public function new(Experience $experience, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            $message = 'Le JSON envoyé contient des données non valides.';
            foreach ($violations as $violation) {
                $message .= sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }
            throw new ResourceValidationException($message);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($experience);
        $em->flush();

        return $this->view(
            $experience,
            Response::HTTP_CREATED,
            ['Location' =>$this->generateUrl(
                'experience_id',
                ['id' => $experience->getId()])
            ]
        );
    }

    /**
     * @Rest\Post(
     *    path = "/api/admin/experience/edit/{id}",
     *    name = "experience_edit",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     * @ParamConverter("experience", converter="fos_rest.request_body")
     */
    public function edit($id, Experience $experience, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            $message = 'Le JSON envoyé contient des données non valides.';
            foreach ($violations as $violation) {
                $message .= sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }
            throw new ResourceValidationException($message);
        }

        $em = $this->getDoctrine()->getManager();
        $data = $em->getRepository(Experience::class)->find($id);        

        if (!$data) {
            throw $this->createNotFoundException(
                'Ressource introuvable'
            );
        }

        $data->setFunction($experience->getFunction());
        $data->setCompany($experience->getCompany());
        $data->setStartyear($experience->getStartyear());
        $data->setEndyear($experience->getEndyear());
        $data->setAbout($experience->getAbout());

        $em->flush();

        return $data;
    }

    /**
     * @Rest\Delete(
     *    path = "/api/admin/experience/delete/{id}",
     *    name = "experience_delete",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function delete($id)
    {
        $em = $this->getDoctrine()->getManager();
        $experience = $em->getRepository(Experience::class)->find($id);

        if (!$experience) {
            throw $this->createNotFoundException(
                'Ressource introuvable'
            );
        }

        $em->remove($experience);
        $em->flush();

        return $experience;
    }
    
    /**
     * @Rest\Get(
     *    path = "/api/experience/view/{id}",
     *    name = "experience_id",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function showId($id)
    {
        $em = $this->getDoctrine()->getManager();
        $experience = $em->getRepository(Experience::class)->find($id);

        if (!$experience) {
            throw $this->createNotFoundException(
                'Ressource introuvable'
            );
        }
        return $experience;
    }

    /**
     * @Rest\Get(
     *    path = "/api/experience",
     *    name = "experience_list",
     * )
     * @Rest\View
     */
    public function showAll()
    {
        $experience = $this->getDoctrine()->getRepository('App:Experience')->findAll();

        return $experience;
    }
}
