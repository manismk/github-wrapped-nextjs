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
import { useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { BottomBar, Brand, Result } from "../components";

export default function Home() {
  const inputRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const currentYear = process.env.NEXT_PUBLIC_CURR_YEAR || 2022;
  const resultRef = useRef(null);

  const clickHandler = async () => {
    const username = inputRef?.current?.value?.trim();
    if (username?.length) {
      setLoading(true);
      try {
        const res = await fetch("/api/getData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });
        if (res.status === 200) {
          const body = await res.json();
          setData(body);
          setLoading(false);
        } else {
          const text = await res.text();
          setError(text);
          setLoading(false);
        }
      } catch (e) {
        setError("Something went wrong!");
        setLoading(false);
      }
    } else {
      setError("Please enter valid github username");
      inputRef.current.value = "";
    }
  };

  if (data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p="1rem">
        <Box mt="3rem" textAlign="center">
          <Box boxShadow="xl">
            <Box p="2rem" pb="0.5rem" bg="#f3f4fa" ref={resultRef}>
              <Result data={data} />
              <Brand />
            </Box>
            <BottomBar
              currentYear={currentYear}
              data={data}
              resultRef={resultRef}
              onAnotherUserClick={() => setData(null)}
            />
          </Box>
        </Box>
      </Box>
    );
  }

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
            active day, month and more
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
            Get My github wrapped
          </Button>
        </Box>
      </Box>
    </>
  );
}
