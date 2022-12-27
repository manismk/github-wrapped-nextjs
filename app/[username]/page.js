"use client";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Error } from "../../components/Error";
import { Result } from "../../components/Result";
import { HiDownload } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { exportComponentAsPNG } from "react-component-export-image";

const User = (page) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const resultRef = useRef(null);
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await fetch("/api/getData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: page?.params?.username }),
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
    })();
  }, []);

  if (loading)
    return (
      <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
        <Spinner color="rgb(59, 55, 191)" />
      </Flex>
    );

  if (error || !data.username)
    return (
      <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
        <Error error={error ? error : "Something went wrong!"} />
      </Flex>
    );

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p="1rem">
      <Box mt="3rem" textAlign="center">
        <Box boxShadow="xl">
          <Box p="2rem" pb="0.5rem" bg="#f3f4fa" ref={resultRef}>
            <Result data={data} />
            <Text fontSize="12px" my="6px" textAlign="end">
              Get Yours @
              <Link href="https://githubwrapped.netlify.app">
                githubwrapped.netlify.app
              </Link>
            </Text>
          </Box>
          <Flex pl="2rem" pb="1rem" gap="12px">
            <IconButton
              bg="#fff"
              _hover={{ background: "#fff" }}
              icon={<HiDownload />}
              onClick={() =>
                exportComponentAsPNG(resultRef, {
                  fileName: `Githubwrapped-${data?.username}-2022`,
                })
              }
            />
            <Button
              bg="#fff"
              _hover={{ background: "#fff" }}
              onClick={() => router.push("/")}
            >
              check for another user
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default User;
