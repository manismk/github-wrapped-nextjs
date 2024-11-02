import { Link, Text } from "@chakra-ui/react";

export const Brand = () => {
  return (
    <Text fontSize="12px" my="6px" textAlign="end">
      Get yours @
      <Link href="https://githubwrapped.netlify.app">
        githubwrapped.netlify.app
      </Link>
    </Text>
  );
};
