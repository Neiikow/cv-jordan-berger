<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Table(name="experience")
 * @ORM\Entity(repositoryClass="App\Repository\ExperienceRepository")
 * @Serializer\ExclusionPolicy("ALL")
 */
class Experience
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Serializer\Expose
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Serializer\Expose
     * @Assert\NotBlank
     */
    private $function;

    /**
     * @ORM\Column(type="string", length=255)
     * @Serializer\Expose
     * @Assert\NotBlank
     */
    private $company;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Serializer\Expose
     */
    private $startyear;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Serializer\Expose
     */
    private $endyear;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Serializer\Expose
     */
    private $about;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFunction(): ?string
    {
        return $this->function;
    }

    public function setFunction(string $function): self
    {
        $this->function = $function;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(string $company): self
    {
        $this->company = $company;

        return $this;
    }

    public function getStartyear(): ?int
    {
        return $this->startyear;
    }

    public function setStartyear(?int $startyear): self
    {
        $this->startyear = $startyear;

        return $this;
    }

    public function getEndyear(): ?int
    {
        return $this->endyear;
    }

    public function setEndyear(?int $endyear): self
    {
        $this->endyear = $endyear;

        return $this;
    }

    public function getAbout(): ?string
    {
        return $this->about;
    }

    public function setAbout(?string $about): self
    {
        $this->about = $about;

        return $this;
    }
}
