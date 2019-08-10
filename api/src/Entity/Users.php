<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Table(name="users")
 * @ORM\Entity(repositoryClass="App\Repository\UsersRepository")
 * @Serializer\ExclusionPolicy("ALL")
 */
class Users implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Serializer\Expose
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Serializer\Expose
     * @Assert\NotBlank
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=255)
     * @Serializer\Expose
     */
    private $password;

    /**
     * @ORM\Column(type="array")
     * @Serializer\Expose
     */
    private $roles = [];

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Serializer\Expose
     * @Assert\NotBlank
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Serializer\Expose
     */
    private $picture;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Serializer\Expose
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Serializer\Expose
     */
    private $street;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @Serializer\Expose
     */
    private $postal;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @Serializer\Expose
     */
    private $phone;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Serializer\Expose
     */
    private $about;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Serializer\Expose
     */
    private $age;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getRoles(): ?array
    {
        return $this->roles;
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getStreet(): ?string
    {
        return $this->street;
    }

    public function getSalt() { }

    public function setStreet(?string $street): self
    {
        $this->street = $street;

        return $this;
    }

    public function getPostal(): ?string
    {
        return $this->postal;
    }

    public function setPostal(?string $postal): self
    {
        $this->postal = $postal;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

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

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(?int $age): self
    {
        $this->age = $age;

        return $this;
    }

    public function eraseCredentials() {}
}
