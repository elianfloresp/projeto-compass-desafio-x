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
import { useAuthentication } from "../../../hooks/useAuthentication";

interface AuthenticationData {
  auth: any; // Substitua 'any' pelo tipo correto, se possível
  createUser: (data: any) => Promise<any>;
  error: null | string;
  loading: null | boolean;
}

interface UserData {
  displayName: string;
  email: string;
  password: string;
  profession: string;
  country: string;
  city: string;
  birth: string;
  civilStatus: string;
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
    civilStatus: "",
  });

  const { createUser, error: authError, loading }: AuthenticationData = useAuthentication();

  const handleCivilStatusChange = (selectedStatus: string) => {
    setUserData({ ...userData, civilStatus: selectedStatus });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    setError("");
  
    const {
      displayName,
      email,
      password,
      profession,
      country,
      city,
      birth,
      civilStatus,
    } = userData;
  
    const user = {
      displayName,
      email,
      password,
      profession,
      country,
      city,
      birth,
      civilStatus,
    };
    console.log("user", user)  
    try {
      const res = await createUser(user);
  
      // Trate a resposta aqui, se necessário
    } catch (error) {
      // Trate erros, se houver algum
    }
  };

 

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  

  const isMobile = useMediaQuery("(max-width: 768px)");


  useEffect (() =>{

    if(authError) {
      setError(authError)
    }
  }, [authError])


  return (
    <FormContainer className="no-padding-top">
      <Title style={{ paddingBottom: "0" }}>Cadastre-se no UOLkut</Title>
      <Input
        id="sign-up-email"
        name="email"
        placeholder="E-mail"
        style={{ marginTop: "1.25rem", marginBottom: "1rem" }}
        type="email"
        value={userData.email}
        onChange={handleChange}
      />
      <Input
        id="sign-up-password"
        name="password"
        placeholder="Senha"
        type="password"
        value={userData.password}
        onChange={handleChange}
      />
      <Input
        id="sign-up-name"
        name="displayName"
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
            name="birth"
            placeholder={isMobile ? "DD/MM/AAAA" : "Nascimento"}
            type="text"
            value={userData.birth}
            onChange={handleChange}
          />
          {!isMobile && <DateLabel>DDD/MM/AAAA</DateLabel>}
        </DateInputContainer>

        <Input
          id="sign-up-occupation"
          name="profession"
          className="small-input"
          placeholder="Profissão"
          type="text"
          value={userData.profession}
          onChange={handleChange}
        />

        <Input
          id="sign-up-country"
          name="country"
          className="small-input"
          placeholder="País"
          type="text"
          value={userData.country}
          onChange={handleChange}
        />
        <Input
          id="sign-up-city"
          name="city"
          className="small-input"
          placeholder="Cidade"
          type="text"
          value={userData.city}
          onChange={handleChange}
        />
      </GridInputContainer>

      <CustomSelectMenu
        style={{ marginTop: "0", marginBottom: "2.31rem" }}
        onCivilStatusChange={handleCivilStatusChange}
        onSelectionChange={function (value: any): unknown {
          throw new Error("Function not implemented.");
        }}
      />

      <div onClick={handleSubmit}>
        {!loading && <LinkButton style={{ marginTop: "0", marginBottom: "0" }} to="/">
          Criar conta
        </LinkButton>}
        {error && <p className="error">{error}</p>}
      </div>
      
    </FormContainer>
  );
};

export default SignUpFormStepOne;
