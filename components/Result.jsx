import { Avatar, Box, Center, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import { VscGraphLine } from "react-icons/vsc";
import { IoCalendarOutline, IoRocketOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MonthWiseGraph } from "./MonthWiseData";
import { WeekWiseGraph } from "./WeekWiseData";
import dayjs from "dayjs";

export const Result = ({ data }) => {
  const currentYear = process.env.NEXT_PUBLIC_CURR_YEAR || 2022;
  return (
    <Box w={{ base: "100%", sm: "450px", md: "750px" }} color="#000">
      <Flex
        flexDir={{
          md: "row",
          sm: "column",
          base: "column",
        }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontWeight="600" fontSize="22px" color="rgb(59, 55, 191)">
          #GithubWrapped - {currentYear}
        </Text>

        <Flex alignItems="center" gap="12px">
          <Flex fontSize="20px" gap="4px" fontWeight="600">
            <Text>@{data?.username}</Text>
            {data?.actualName && <Text>{`(${data?.actualName})`}</Text>}
          </Flex>
          <Avatar size="sm" name={data?.actualName} src={data?.userImgUrl} />
        </Flex>
      </Flex>
      <Grid
        gap="10px"
        gridTemplateColumns={{ sm: "1fr", md: "70fr 30fr" }}
        mt="1.5rem"
        h={{ md: "250px" }}
      >
        <Box bg="#fff" p="8px 16px" borderRadius="16px">
          <MonthWiseGraph monthData={data?.monthWiseCount} />
        </Box>
        <Flex
          flexDirection="column"
          gap="12px"
          bg="#fff"
          borderRadius="16px"
          p="16px"
        >
          <Text fontWeight="600" color="rgb(59, 55, 191)">
            Overall stats
          </Text>
          <Box
            gap="10px"
            display={{ base: "grid", md: "flex" }}
            flexDir={{ md: "column" }}
            gridTemplateColumns={{ base: "1fr 1fr 1fr" }}
          >
            <Flex
              gap="12px"
              flexDir={{ base: "column", md: "row" }}
              alignItems={{ base: "center" }}
            >
              <Center bg="#f3f4fa" h="54px" w="54px" borderRadius="12px">
                <Icon as={VscGraphLine} boxSize="6" color="rgb(59, 55, 191)" />
              </Center>
              <Flex
                flexDirection="column"
                textAlign={{ md: "left" }}
                justifyContent="space-between"
              >
                <Text fontSize="24px" fontWeight="700">
                  {data?.totalCount}
                </Text>
                <Text fontSize="12px" color="#aaa" fontWeight="600">
                  Total contributions
                </Text>
              </Flex>
            </Flex>
            <Flex
              gap="12px"
              flexDir={{ base: "column", md: "row" }}
              alignItems={{ base: "center" }}
            >
              <Center bg="#f3f4fa" h="54px" w="54px" borderRadius="12px">
                <Icon
                  as={IoCalendarOutline}
                  boxSize="6"
                  color="rgb(59, 55, 191)"
                />
              </Center>
              <Flex
                flexDirection="column"
                textAlign={{ md: "left" }}
                justifyContent="space-between"
              >
                <Text fontSize="24px" fontWeight="700">
                  {data?.activeDaysCount}
                </Text>
                <Text fontSize="12px" color="#aaa" fontWeight="600">
                  Total active days
                </Text>
              </Flex>
            </Flex>
            <Flex
              gap="12px"
              flexDir={{ base: "column", md: "row" }}
              alignItems={{ base: "center" }}
            >
              <Center bg="#f3f4fa" h="54px" w="54px" borderRadius="12px">
                <Icon
                  as={IoRocketOutline}
                  boxSize="6"
                  color="rgb(59, 55, 191)"
                />
              </Center>
              <Flex
                flexDirection="column"
                textAlign={{ md: "left" }}
                justifyContent="space-between"
              >
                <Text fontSize="24px" fontWeight="700">
                  {data?.longestStreak?.streak}
                </Text>
                <Text fontSize="12px" color="#aaa" fontWeight="600">
                  Longest streak
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Grid>
      <Grid
        gap="10px"
        gridTemplateColumns={{ sm: "1fr", md: "65fr 35fr" }}
        mt="18px"
        h={{ md: "200px" }}
      >
        <Box bg="#fff" borderRadius="16px" p="8px">
          <Text mt="4px" mb="12px" fontWeight="600" color="rgb(59, 55, 191)">
            Activity stats
          </Text>
          <Grid gap="10px" gridTemplateColumns="1fr 1fr 1fr">
            <Flex
              gap="8px"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Center bg="#f3f4fa" h="40px" w="40px" borderRadius="12px">
                <Icon
                  as={IoRocketOutline}
                  boxSize="5"
                  color="rgb(59, 55, 191)"
                />
              </Center>
              <Flex
                flexDirection="column"
                gap="4px"
                justifyContent="space-between"
              >
                <Text fontSize="24px" fontWeight="700">
                  {data?.maxCount?.count}
                </Text>
                <Text fontSize="14px" fontWeight="600">
                  {dayjs(data?.maxCount?.date, "YYYY-MM-DD", true).format(
                    "DD MMM"
                  )}
                </Text>
                <Text fontSize="12px" color="#aaa" fontWeight="600">
                  Most activity day
                </Text>
              </Flex>
            </Flex>
            <Flex
              gap="8px"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Center bg="#f3f4fa" h="40px" w="40px" borderRadius="12px">
                <Icon
                  as={AiOutlineClockCircle}
                  boxSize="5"
                  color="rgb(59, 55, 191)"
                />
              </Center>
              <Flex
                flexDirection="column"
                gap="4px"
                justifyContent="space-between"
              >
                <Text fontSize="24px" fontWeight="700">
                  {data?.maxDayCount?.count}
                </Text>
                <Text
                  fontSize="14px"
                  fontWeight="600"
                  textTransform="capitalize"
                >
                  {data?.maxDayCount?.day}
                </Text>
                <Text fontSize="12px" color="#aaa" fontWeight="600">
                  Most active on
                </Text>
              </Flex>
            </Flex>
            <Flex
              gap="8px"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Center bg="#f3f4fa" h="40px" w="40px" borderRadius="12px">
                <Icon
                  as={IoCalendarOutline}
                  boxSize="5"
                  color="rgb(59, 55, 191)"
                />
              </Center>
              <Flex
                flexDirection="column"
                gap="4px"
                justifyContent="space-between"
              >
                <Text fontSize="24px" fontWeight="700">
                  {data?.maxMonthCount?.count}
                </Text>
                <Text
                  fontSize="14px"
                  fontWeight="600"
                  textTransform="capitalize"
                >
                  {data?.maxMonthCount?.month}
                </Text>
                <Text fontSize="12px" color="#aaa" fontWeight="600">
                  Most active month
                </Text>
              </Flex>
            </Flex>
          </Grid>
        </Box>
        <Box bg="#fff" p="4px 8px" borderRadius="16px">
          <WeekWiseGraph weekData={data?.dayWiseCount} />
        </Box>
      </Grid>
    </Box>
  );
};
