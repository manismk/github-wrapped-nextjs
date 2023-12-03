// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import dayjs from "dayjs";

export default async (req, res) => {
  if (!req?.body?.username?.length) {
    res.statusCode = 422;
    res.json("Username not provided");
    return;
  }
  const username = req?.body?.username;
  const srcHtml = await getHtml(username);
  if (srcHtml?.message) {
    res.status(422).send(srcHtml?.message);
    return;
  }
  const resObj = parseContributions(srcHtml, username);
  console.log("user", username);
  res.json(resObj);
};
const getHtml = async (username) => {
  const currentYear = process.env.NEXT_PUBLIC_CURR_YEAR || 2022;
  try {
    const page = await fetch(
      `https://github.com/${username}?tab=overview&from=${currentYear}-12-01&to=${currentYear}-12-31`
    );
    if (page.status !== 200 && page.status === 404)
      throw new Error("Profile not found");
    if (page.status !== 200) throw new Error("Something went wrong");
    return await page.text();
  } catch (e) {
    return e;
  }
};

const parseContributions = (htmlSrc, username) => {
  const window = new JSDOM(htmlSrc).window;

  const document = window.document;
  const tooltips = document.querySelectorAll("tool-tip");
  const tooltipsArr = Array.from(tooltips).map((tooltip) => ({
    for: tooltip.getAttribute("for"),
    text: tooltip.innerHTML,
  }));
  const days = document.querySelectorAll(".ContributionCalendar-day");
  const userImgUrl = document.querySelector(["[itemprop='image'] img"])?.src;
  const actualName = document
    .querySelector(["[itemprop='name']"])
    ?.innerHTML?.trim();
  const dateWiseData = Array.from(days).map((day) => {
    const tooltipText = tooltipsArr.find((tool) => tool?.for == day?.id)?.text;
    return {
      date: day.getAttribute("data-date"),
      count: isNaN(+tooltipText?.split(" ")[0])
        ? 0
        : +tooltipText?.split(" ")[0],
      colorLevel: day.getAttribute("data-level"),
      day: dayjs(day.getAttribute("data-date")).day(),
      month: dayjs(day.getAttribute("data-date")).month(),
    };
  });

  const totalCount = dateWiseData.reduce((acc, curr) => acc + +curr.count, 0);
  const maxCount = dateWiseData.reduce(
    (acc, curr) => {
      if (+curr.count > acc.count) {
        acc.count = +curr.count;
        acc.date = curr.date;
      }
      return acc;
    },
    { count: 0, date: 0 }
  );

  const monthWiseCount = {
    january: dateWiseData.reduce(
      (acc, curr) => (curr.month === 0 ? acc + +curr.count : acc),
      0
    ),
    febuaray: dateWiseData.reduce(
      (acc, curr) => (curr.month === 1 ? acc + +curr.count : acc),
      0
    ),
    march: dateWiseData.reduce(
      (acc, curr) => (curr.month === 2 ? acc + +curr.count : acc),
      0
    ),
    april: dateWiseData.reduce(
      (acc, curr) => (curr.month === 3 ? acc + +curr.count : acc),
      0
    ),
    may: dateWiseData.reduce(
      (acc, curr) => (curr.month === 4 ? acc + +curr.count : acc),
      0
    ),
    june: dateWiseData.reduce(
      (acc, curr) => (curr.month === 5 ? acc + +curr.count : acc),
      0
    ),
    july: dateWiseData.reduce(
      (acc, curr) => (curr.month === 6 ? acc + +curr.count : acc),
      0
    ),
    august: dateWiseData.reduce(
      (acc, curr) => (curr.month === 7 ? acc + +curr.count : acc),
      0
    ),
    september: dateWiseData.reduce(
      (acc, curr) => (curr.month === 8 ? acc + +curr.count : acc),
      0
    ),
    october: dateWiseData.reduce(
      (acc, curr) => (curr.month === 9 ? acc + +curr.count : acc),
      0
    ),
    november: dateWiseData.reduce(
      (acc, curr) => (curr.month === 10 ? acc + +curr.count : acc),
      0
    ),
    december: dateWiseData.reduce(
      (acc, curr) => (curr.month === 11 ? acc + +curr.count : acc),
      0
    ),
  };

  const dayWiseCount = {
    sunday: dateWiseData.reduce(
      (acc, curr) => (curr.day === 0 ? acc + +curr.count : acc),
      0
    ),
    monday: dateWiseData.reduce(
      (acc, curr) => (curr.day === 1 ? acc + +curr.count : acc),
      0
    ),
    tuesday: dateWiseData.reduce(
      (acc, curr) => (curr.day === 2 ? acc + +curr.count : acc),
      0
    ),
    wednesday: dateWiseData.reduce(
      (acc, curr) => (curr.day === 3 ? acc + +curr.count : acc),
      0
    ),
    thursday: dateWiseData.reduce(
      (acc, curr) => (curr.day === 4 ? acc + +curr.count : acc),
      0
    ),
    friday: dateWiseData.reduce(
      (acc, curr) => (curr.day === 5 ? acc + +curr.count : acc),
      0
    ),
    saturday: dateWiseData.reduce(
      (acc, curr) => (curr.day === 6 ? acc + +curr.count : acc),
      0
    ),
  };

  const maxMonthCount = Object.entries(monthWiseCount).reduce(
    (acc, curr) => {
      if (curr[1] > acc.count) {
        (acc.count = curr[1]), (acc.month = curr[0]);
      }
      return acc;
    },
    { count: 0, month: "january" }
  );

  const maxDayCount = Object.entries(dayWiseCount).reduce(
    (acc, curr) => {
      if (curr[1] > acc.count) {
        (acc.count = curr[1]), (acc.day = curr[0]);
      }
      return acc;
    },
    { count: 0, day: "sunday" }
  );
  const activeDaysCount = dateWiseData.reduce((acc, curr) => {
    if (+curr.count) {
      acc++;
    }
    return acc;
  }, 0);
  const longestStreak = dateWiseData.reduce(
    (acc, curr) => {
      if (+curr.count) {
        acc.count++;
      } else {
        if (acc.count > acc.streak) {
          acc.streak = acc.count;
        }
        acc.count = 0;
      }
      return acc;
    },
    {
      streak: 0,
      count: 0,
    }
  );

  const finalObj = {
    username,
    actualName,
    totalCount,
    dayWiseCount,
    monthWiseCount,
    maxCount,
    maxMonthCount,
    maxDayCount,
    activeDaysCount,
    longestStreak,
    userImgUrl,
  };

  return finalObj;
};
