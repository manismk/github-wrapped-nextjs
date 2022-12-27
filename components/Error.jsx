import { Box, Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export const Error = ({ error = "Something Went Wrong!" }) => {
  const router = useRouter();
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mb="2rem" textTransform="capitalize">
        {error}
      </Heading>

      <Button
        bg="rgb(59, 55, 191)"
        color="white"
        _hover={{ bg: "rgb(59, 55, 191)" }}
        _active={{ bg: "rgb(59, 55, 191)" }}
        onClick={() => router.push("/")}
      >
        Go to Home
      </Button>
    </Box>
  );
};
