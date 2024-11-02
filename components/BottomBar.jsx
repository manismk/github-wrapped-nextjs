import { Button, Center, Flex, Icon, IconButton, Link } from "@chakra-ui/react";
import { exportComponentAsPNG } from "react-component-export-image";
import { HiDownload } from "react-icons/hi";
import { FaTwitter } from "react-icons/fa";
import { useRouter } from "next/navigation";

export const BottomBar = ({ currentYear, data, resultRef }) => {
  const router = useRouter();

  return (
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
  );
};
