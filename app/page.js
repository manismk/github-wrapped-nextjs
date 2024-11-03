"use client";

import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const inputRef = useRef(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const currentYear = process.env.NEXT_PUBLIC_CURR_YEAR || 2022;

  const clickHandler = () => {
    if (inputRef?.current?.value?.trim()?.length) {
      setLoading(true);
      router.push(`/${inputRef?.current?.value?.trim()}`);
    } else {
      setError("Please enter valid github username");
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" p="1rem">
        <Box mt="3rem" textAlign="center">
          <Heading mt="3rem" as="h1" fontSize="48px">
            #GithubWrapped
          </Heading>
          <Text fontSize="20px" fontWeight="600" mt="8px">
            How did you contribute in {currentYear}
          </Text>
          <Text mt="5rem" fontSize="20px" fontWeight="600">
            Get your total contriburtion, active days, longest streak, most
          </Text>
          <InputGroup m="1rem auto" w="20rem">
            <InputLeftElement pointerEvents="none" children={<FaGithub />} />
            <Input
              ref={inputRef}
              fontWeight="600"
              outline="0px"
              borderColor="rgb(59, 55, 191)"
              _focus={{
                borderColor: "rgb(59, 55, 191)",
                borderWidth: "2px",
                outline: "0px",
                boxShadow: "none",
              }}
              _hover={{ borderColor: "rgb(59, 55, 191)" }}
              placeholder="Enter your github username"
              onChange={() => {
                error && setError(null);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") clickHandler();
              }}
            />
          </InputGroup>
          {error && (
            <Text color="red.500" fontWeight="500">
              {error}
            </Text>
          )}
          <Button
            mt="1rem"
            bg="rgb(59, 55, 191)"
            color="white"
            _hover={{ bg: "rgb(59, 55, 191)" }}
            _active={{ bg: "rgb(59, 55, 191)" }}
            w="20rem"
            onClick={clickHandler}
            isLoading={isLoading}
          >
            Get my github wrapped
          </Button>
        </Box>
      </Box>
    </>
  );
}
