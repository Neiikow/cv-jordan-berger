<?php

namespace App\Controller;

use App\Entity\Portfolio;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\ConstraintViolationList;
use App\Exception\ResourceValidationException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

class PortfolioController extends FOSRestController
{
    /**
     * @Rest\Post(
     *    path = "/api/admin/portfolio/new",
     *    name = "portfolio_create"
     * )
     * @Rest\View(StatusCode = 201)
     * @ParamConverter("portfolio", converter="fos_rest.request_body")
     */
    public function new(Portfolio $portfolio, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            $message = 'Le JSON envoyé contient des données non valides.';
            foreach ($violations as $violation) {
                $message .= sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }
            throw new ResourceValidationException($message);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($portfolio);
        $em->flush();

        return $this->view(
            $portfolio,
            Response::HTTP_CREATED,
            ['Location' =>$this->generateUrl(
                'portfolio_id',
                ['id' => $portfolio->getId()])
            ]
        );
    }

    /**
     * @Rest\Post(
     *    path = "/api/admin/portfolio/edit/{id}",
     *    name = "portfolio_edit",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     * @ParamConverter("portfolio", converter="fos_rest.request_body")
     */
    public function edit($id, Portfolio $portfolio, ConstraintViolationList $violations)
    {
        if (count($violations)) {
            $message = 'Le JSON envoyé contient des données non valides.';
            foreach ($violations as $violation) {
                $message .= sprintf(" %s : %s", $violation->getPropertyPath(), $violation->getMessage());
            }
            throw new ResourceValidationException($message);
        }

        $em = $this->getDoctrine()->getManager();
        $data = $em->getRepository(Portfolio::class)->find($id);        

        if (!$data) {
            throw $this->createNotFoundException(
                'Ressource introuvable'
            );
        }

        $data->setTitle($portfolio->getTitle());
        $data->setPicture($portfolio->getPictrue());
        $data->setCategory($portfolio->getCategory());
        $data->setDetails($portfolio->getDetails());
        
        $em->flush();

        return $data;
    }

    /**
     * @Rest\Delete(
     *    path = "/api/admin/portfolio/delete/{id}",
     *    name = "portfolio_delete",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function delete($id)
    {
        $em = $this->getDoctrine()->getManager();
        $portfolio = $em->getRepository(Portfolio::class)->find($id);

        if (!$portfolio) {
            throw $this->createNotFoundException(
                'Ressource introuvable'
            );
        }

        $em->remove($portfolio);
        $em->flush();

        return $portfolio;
    }
    
    /**
     * @Rest\Get(
     *    path = "/api/portfolio/view/{id}",
     *    name = "portfolio_id",
     *    requirements = {"id"="\d+"}
     * )
     * @Rest\View
     */
    public function showId($id)
    {
        $em = $this->getDoctrine()->getManager();
        $portfolio = $em->getRepository(Portfolio::class)->find($id);

        if (!$portfolio) {
            throw $this->createNotFoundException(
                'Ressource introuvable'
            );
        }
        return $portfolio;
    }

    /**
     * @Rest\Get(
     *    path = "/api/portfolio",
     *    name = "portfolio_list",
     * )
     * @Rest\View
     */
    public function showAll()
    {
        $portfolio = $this->getDoctrine()->getRepository('App:Portfolio')->findAll();

        return $portfolio;
    }
}
