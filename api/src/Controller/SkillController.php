<?php

namespace App\Controller;

use App\Entity\Skill;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\ConstraintViolationList;
use App\Exception\ResourceValidationException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

class SkillController extends FOSRestController
{
    /**
     * @Rest\Post(
     *    path = "/api/skill/new",
     *    name = "skill_create"
     * )
     * @Rest\View(StatusCode = 201)
     * @ParamConverter("skill", converter="fos_rest.request_body")
     */
    public function new(Skill $skill, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            $message = 'Le JSON envoyé contient des données non valides.';
            foreach ($violations as $violation) {
                $message .= sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }
            throw new ResourceValidationException($message);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($skill);
        $em->flush();

        return $this->view(
            $skill,
            Response::HTTP_CREATED,
            ['Location' =>$this->generateUrl(
                'skill_id',
                ['id' => $skill->getId()])
            ]
        );
    }

    /**
     * @Rest\Post(
     *    path = "/api/skill/edit/{id}",
     *    name = "skill_edit",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     * @ParamConverter("skill", converter="fos_rest.request_body")
     */
    public function edit($id, Skill $skill, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            $message = 'Le JSON envoyé contient des données non valides.';
            foreach ($violations as $violation) {
                $message .= sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }
            throw new ResourceValidationException($message);
        }

        $em = $this->getDoctrine()->getManager();
        $data = $em->getRepository(Skill::class)->find($id);        

        if (!$data) {
            throw $this->createNotFoundException(
                'Ressource introuvable'
            );
        }

        $data->setTitle($skill->getTitle());
        $data->setDetails($skill->getDetails());
        
        $em->flush();

        return $data;
    }

    /**
     * @Rest\Delete(
     *    path = "/api/skill/delete/{id}",
     *    name = "skill_delete",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function delete($id)
    {
        $em = $this->getDoctrine()->getManager();
        $skill = $em->getRepository(Skill::class)->find($id);

        if (!$skill) {
            throw $this->createNotFoundException(
                'Ressource introuvable'
            );
        }

        $em->remove($skill);
        $em->flush();

        return $skill;
    }
    
    /**
     * @Rest\Get(
     *    path = "/api/skill/view/{id}",
     *    name = "skill_id",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function showId($id)
    {
        $em = $this->getDoctrine()->getManager();
        $skill = $em->getRepository(Skill::class)->find($id);

        if (!$skill) {
            throw $this->createNotFoundException(
                'Ressource introuvable'
            );
        }
        return $skill;
    }

    /**
     * @Rest\Get(
     *    path = "/api/skill",
     *    name = "skill_list",
     * )
     * @Rest\View
     */
    public function showAll()
    {
        $skill = $this->getDoctrine()->getRepository('App:Skill')->findAll();

        return $skill;
    }
}
