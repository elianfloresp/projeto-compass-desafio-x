import { ChangeEvent, FC, FormEvent } from "react";
import useMediaQuery from "../../../hooks/use-media-query";
import {
  FormContainer,
  Input,
  Title,
  DateInputContainer,
  GridInputContainer,
  DateLabel,
} from "../Styled/StyledForm";
import LinkButton from "../../UI/LinkButton";
import CustomSelectMenu from "../../UI/StyledSelect";
import { useState, useEffect } from "react";

interface UserData {
  displayName: string;
  email: string;
  password: string;
  profession: string;
  country: string;
  city: string;
  birth: string;
}

const SignUpFormStepOne: FC = () => {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<UserData>({
    displayName: "",
    email: "",
    password: "",
    profession: "",
    country: "",
    city: "",
    birth: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setError("");

    const { displayName, email, password,  profession, country, city, birth } = userData;
    const user = {
      displayName,
      email,
      password,
      profession,
      country,
      city,
      birth,
    };
    console.log("teste", user);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <FormContainer className="no-padding-top">
      <Title style={{ paddingBottom: "0" }}>Cadastre-se no UOLkut</Title>
      <Input
        id="sign-up-email"
        placeholder="E-mail"
        style={{ marginTop: "1.25rem", marginBottom: "1rem" }}
        type="email"
        value={userData.email}
        onChange={handleChange}
      />
      <Input
        id="sign-up-password"
        placeholder="Senha"
        type="password"
        value={userData.password}
        onChange={handleChange}
      />
      <Input
        id="sign-up-name"
        placeholder="Nome"
        type="text"
        value={userData.displayName}
        onChange={handleChange}
      />

      <GridInputContainer style={{ marginBottom: "1rem" }}>
        <DateInputContainer>
          <Input
            id="sign-up-birthday"
            className="small-input"
            placeholder={isMobile ? "DD/MM/AAAA" : "birth"}
            type="text"
            value={userData.birth}
            onChange={handleChange}
          />
          {!isMobile && <DateLabel>DDD/MM/AAAA</DateLabel>}
        </DateInputContainer>

        <Input
          id="sign-up-occupation"
          className="small-input"
          placeholder="Profissão"
          type="text"
          value={userData.profession}
          onChange={handleChange}
        />

        <Input
          id="sign-up-country"
          className="small-input"
          placeholder="País"
          type="text"
          value={userData.country}
          onChange={handleChange}
        />
        <Input
          id="sign-up-city"
          className="small-input"
          placeholder="Cidade"
          type="text"
          value={userData.city}
          onChange={handleChange}
        />
      </GridInputContainer>

      <CustomSelectMenu style={{ marginTop: "0", marginBottom: "2.31rem" }} />

      <LinkButton style={{ marginTop: "0", marginBottom: "0" }} to="/">
        Criar conta
      </LinkButton>
    </FormContainer>
  );
};

export default SignUpFormStepOne;
