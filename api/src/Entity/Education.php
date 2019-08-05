<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Table(name="education")
 * @ORM\Entity(repositoryClass="App\Repository\EducationRepository")
 * @Serializer\ExclusionPolicy("ALL")
 */
class Education
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
    private $title;

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
     * @ORM\Column(type="boolean", nullable=true)
     * @Serializer\Expose
     */
    private $isdev;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Serializer\Expose
     */
    private $about;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

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

    public function getIsdev(): ?bool
    {
        return $this->isdev;
    }

    public function setIsdev(bool $isdev): self
    {
        $this->isdev = $isdev;

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
