"use client";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Result } from "../../components/Result";

const User = (page) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        console.log("page", page.params.username);
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
          console.log("res", text);
          setLoading(false);
        }
      } catch (e) {
        console.log("err", e);
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

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p="1rem">
      <Box mt="3rem" textAlign="center">
        <Box boxShadow="xl">
          <Box p="2rem" pb="0.5rem" bg="#f3f4fa">
            <Result data={data} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default User;
