"use client";
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
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
import { FaTwitter } from "react-icons/fa";

const User = (page) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const resultRef = useRef(null);
  const currentYear = process.env.NEXT_PUBLIC_CURR_YEAR || 2022;

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
                  fileName: `Githubwrapped-${data?.username}-${currentYear}`,
                })
              }
            />
            <Link
              href={`https://twitter.com/intent/tweet?original_referer=https://githubwrapped.netlify.app&text=In ${currentYear}, I made over ${data?.totalCount} commits, was active ${data?.activeDaysCount}/365 days with longest streak of ${data?.longestStreak?.streak}days! Check your %23GithubWrapped %23GithubWrapped${currentYear} 👇&tw_p=tweetbutton&url=githubwrapped.netlify.app`}
              target="_blank"
            >
              <Center bg="#fff" w="40px" h="40px" borderRadius="5px">
                <Icon as={FaTwitter} />
              </Center>
            </Link>
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
