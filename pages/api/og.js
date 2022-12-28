import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async (req, res) => {
  try {
    const username = req.url.split("og?username=")[1];
    if (username?.length === 0) {
      return new ImageResponse(
        (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              fontSize: 32,
              fontWeight: 600,
              color: "rgb(59, 55, 191)",
            }}
          >
            <div style={{ display: "flex" }}>
              <svg
                stroke="rgb(59, 55, 191)"
                fill="rgb(59, 55, 191)"
                stroke-width="0"
                viewBox="0 0 496 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
              </svg>
            </div>
            <div style={{ marginTop: 10 }}> #GithubWrapped - 2022</div>
            <div style={{ marginTop: 10, fontSize: "20px" }}>
              How did you contribute in 2022
            </div>
            <div style={{ marginTop: 10, fontSize: "16px" }}>
              Get your Total contriburtion, Active days, longest streak, Most
              active day, month and more
            </div>
            <div style={{ display: "flex", marginTop: 10, fontSize: "16px" }}>
              Get Yours{" "}
              <span
                style={{
                  marginLeft: "4px",
                }}
              >
                @https://githubwrapped.netlify.app
              </span>
            </div>
          </div>
        ),
        {
          width: 820,
          height: 600,
        }
      );
    }
    const result = await fetch(
      "https://githubwrapped.netlify.app/api/getData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }),
      }
    );
    const data = await result.json();

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f3f4fa",
            fontSize: 32,
            fontWeight: 600,
            padding: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              fontSize: "24px",
              color: "rgb(59, 55, 191)",
            }}
          >
            <div> #GithubWrapped - 2022</div>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", color: "#000" }}>
                @{data?.username}({data?.actualName})
              </div>
              <img
                src={data?.userImgUrl}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "100px",
                  marginLeft: "10px",
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "10px", height: "250px" }}>
            <div
              style={{
                display: "flex",
                height: "100%",
                width: "65%",
                backgroundColor: "#fff",
                borderRadius: "16px",
              }}
            >
              <img
                src={
                  data?.maxMonthCount?.count > 0
                    ? "https://images2.imgbox.com/51/7c/JYcbJdKa_o.png"
                    : "https://images2.imgbox.com/a4/96/YCn0F9BG_o.png"
                }
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                height: "100%",
                width: "35%",
                marginLeft: "10px",
                borderRadius: "16px",
                backgroundColor: "#fff",
                color: "rgb(59, 55, 191)",
                flexDirection: "column",
                paddingLeft: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  margin: "10px 0px",
                  fontWeight: "bold",
                  marginLeft: "4rem",
                }}
              >
                Overall Stats
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#f3f4fa",
                    height: "54px",
                    width: "54px",
                    borderRadius: "12px",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "20px",
                  }}
                >
                  <svg
                    stroke="rgb(59, 55, 191)"
                    fill="rgb(59, 55, 191)"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    focusable="false"
                    class="chakra-icon css-1h3n1im"
                    height="24px"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15 13V14H1.5L1 13.5V0H2V13H15Z"></path>
                    <path d="M13 3.20714L7.85353 8.35359H7.14642L5.49998 6.70714L1.85353 10.3536L1.14642 9.64648L5.14642 5.64648H5.85353L7.49998 7.29293L12.6464 2.14648H13.3535L15.3535 4.14648L14.6464 4.85359L13 3.20714Z"></path>
                  </svg>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontSize: "24px",
                      color: "#000",
                    }}
                  >
                    {data?.totalCount}
                  </div>
                  <div style={{ fontSize: "12px", color: "#aaa" }}>
                    Total contributions
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", marginTop: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#f3f4fa",
                    height: "54px",
                    width: "54px",
                    borderRadius: "12px",
                    marginRight: "20px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    stroke="rgb(59, 55, 191)"
                    fill="rgb(59, 55, 191)"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    focusable="false"
                    class="chakra-icon css-1h3n1im"
                    height="24px"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="416"
                      height="384"
                      x="48"
                      y="80"
                      fill="none"
                      stroke-linejoin="round"
                      stroke-width="32"
                      rx="48"
                    ></rect>
                    <circle cx="296" cy="232" r="24"></circle>
                    <circle cx="376" cy="232" r="24"></circle>
                    <circle cx="296" cy="312" r="24"></circle>
                    <circle cx="376" cy="312" r="24"></circle>
                    <circle cx="136" cy="312" r="24"></circle>
                    <circle cx="216" cy="312" r="24"></circle>
                    <circle cx="136" cy="392" r="24"></circle>
                    <circle cx="216" cy="392" r="24"></circle>
                    <circle cx="296" cy="392" r="24"></circle>
                    <path
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="32"
                      d="M128 48v32m256-32v32"
                    ></path>
                    <path
                      fill="none"
                      stroke-linejoin="round"
                      stroke-width="32"
                      d="M464 160H48"
                    ></path>
                  </svg>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontSize: "24px",
                      color: "#000",
                    }}
                  >
                    {data?.activeDaysCount}
                  </div>
                  <div style={{ fontSize: "12px", color: "#aaa" }}>
                    Total Active Days
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", marginTop: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#f3f4fa",
                    height: "54px",
                    width: "54px",
                    borderRadius: "12px",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "20px",
                  }}
                >
                  <svg
                    stroke="rgb(59, 55, 191)"
                    fill="rgb(59, 55, 191)"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    focusable="false"
                    class="chakra-icon css-1h3n1im"
                    height="24px"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="32"
                      d="M461.81 53.81a4.4 4.4 0 00-3.3-3.39c-54.38-13.3-180 34.09-248.13 102.17a294.9 294.9 0 00-33.09 39.08c-21-1.9-42-.3-59.88 7.5-50.49 22.2-65.18 80.18-69.28 105.07a9 9 0 009.8 10.4l81.07-8.9a180.29 180.29 0 001.1 18.3 18.15 18.15 0 005.3 11.09l31.39 31.39a18.15 18.15 0 0011.1 5.3 179.91 179.91 0 0018.19 1.1l-8.89 81a9 9 0 0010.39 9.79c24.9-4 83-18.69 105.07-69.17 7.8-17.9 9.4-38.79 7.6-59.69a293.91 293.91 0 0039.19-33.09c68.38-68 115.47-190.86 102.37-247.95zM298.66 213.67a42.7 42.7 0 1160.38 0 42.65 42.65 0 01-60.38 0z"
                    ></path>
                    <path
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="32"
                      d="M109.64 352a45.06 45.06 0 00-26.35 12.84C65.67 382.52 64 448 64 448s65.52-1.67 83.15-19.31A44.73 44.73 0 00160 402.32"
                    ></path>
                  </svg>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontSize: "24px",
                      color: "#000",
                    }}
                  >
                    {data?.longestStreak?.streak}
                  </div>
                  <div style={{ fontSize: "12px", color: "#aaa" }}>
                    Longest Streak
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "10px", height: "200px" }}>
            <div
              style={{
                display: "flex",
                height: "100%",
                width: "55%",
                backgroundColor: "#fff",
                borderRadius: "16px",
                color: "rgb(59, 55, 191)",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <div
                style={{
                  marginBottom: "16px",
                  fontSize: "16px",
                  marginLeft: "160px",
                }}
              >
                Activity Stats
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "130px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      backgroundColor: "#f3f4fa",
                      height: "40px",
                      width: "40px",
                      borderRadius: "6px",
                      marginBottom: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      stroke="rgb(59, 55, 191)"
                      fill="rgb(59, 55, 191)"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      focusable="false"
                      class="chakra-icon css-x2mgpt"
                      height="20px"
                      width="20px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="32"
                        d="M461.81 53.81a4.4 4.4 0 00-3.3-3.39c-54.38-13.3-180 34.09-248.13 102.17a294.9 294.9 0 00-33.09 39.08c-21-1.9-42-.3-59.88 7.5-50.49 22.2-65.18 80.18-69.28 105.07a9 9 0 009.8 10.4l81.07-8.9a180.29 180.29 0 001.1 18.3 18.15 18.15 0 005.3 11.09l31.39 31.39a18.15 18.15 0 0011.1 5.3 179.91 179.91 0 0018.19 1.1l-8.89 81a9 9 0 0010.39 9.79c24.9-4 83-18.69 105.07-69.17 7.8-17.9 9.4-38.79 7.6-59.69a293.91 293.91 0 0039.19-33.09c68.38-68 115.47-190.86 102.37-247.95zM298.66 213.67a42.7 42.7 0 1160.38 0 42.65 42.65 0 01-60.38 0z"
                      ></path>
                      <path
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="32"
                        d="M109.64 352a45.06 45.06 0 00-26.35 12.84C65.67 382.52 64 448 64 448s65.52-1.67 83.15-19.31A44.73 44.73 0 00160 402.32"
                      ></path>
                    </svg>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontSize: "24px",
                      color: "#000",
                      marginBottom: "6px",
                    }}
                  >
                    {data?.maxCount?.count}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#000",
                      marginBottom: "6px",
                    }}
                  >
                    {data?.maxCount?.date}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#aaa",
                      marginBottom: "6px",
                    }}
                  >
                    Most Active Day
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "130px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      backgroundColor: "#f3f4fa",
                      height: "40px",
                      width: "40px",
                      borderRadius: "6px",
                      marginBottom: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      stroke="rgb(59, 55, 191)"
                      fill="rgb(59, 55, 191)"
                      stroke-width="0"
                      viewBox="0 0 1024 1024"
                      focusable="false"
                      class="chakra-icon css-x2mgpt"
                      height="20px"
                      width="20px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                      <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path>
                    </svg>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontSize: "24px",
                      color: "#000",
                      marginBottom: "6px",
                    }}
                  >
                    {data?.maxDayCount?.count}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#000",
                      marginBottom: "6px",
                    }}
                  >
                    {data?.maxDayCount?.day}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#aaa",
                      marginBottom: "6px",
                    }}
                  >
                    Most Active On
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "130px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      backgroundColor: "#f3f4fa",
                      height: "40px",
                      width: "40px",
                      borderRadius: "6px",
                      marginBottom: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      stroke="rgb(59, 55, 191)"
                      fill="rgb(59, 55, 191)"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      focusable="false"
                      class="chakra-icon css-x2mgpt"
                      height="20px"
                      width="20px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="416"
                        height="384"
                        x="48"
                        y="80"
                        fill="none"
                        stroke-linejoin="round"
                        stroke-width="32"
                        rx="48"
                      ></rect>
                      <circle cx="296" cy="232" r="24"></circle>
                      <circle cx="376" cy="232" r="24"></circle>
                      <circle cx="296" cy="312" r="24"></circle>
                      <circle cx="376" cy="312" r="24"></circle>
                      <circle cx="136" cy="312" r="24"></circle>
                      <circle cx="216" cy="312" r="24"></circle>
                      <circle cx="136" cy="392" r="24"></circle>
                      <circle cx="216" cy="392" r="24"></circle>
                      <circle cx="296" cy="392" r="24"></circle>
                      <path
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="32"
                        d="M128 48v32m256-32v32"
                      ></path>
                      <path
                        fill="none"
                        stroke-linejoin="round"
                        stroke-width="32"
                        d="M464 160H48"
                      ></path>
                    </svg>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontSize: "24px",
                      color: "#000",
                      marginBottom: "6px",
                    }}
                  >
                    {data?.maxMonthCount?.count}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#000",
                      marginBottom: "6px",
                    }}
                  >
                    {data?.maxMonthCount?.month}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#aaa",
                      marginBottom: "6px",
                    }}
                  >
                    Most Active Month
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                height: "100%",
                width: "45%",
                marginLeft: "10px",
                borderRadius: "16px",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={
                  data?.maxMonthCount?.count > 0
                    ? "https://images2.imgbox.com/3f/46/KS91rWni_o.png"
                    : "https://images2.imgbox.com/3b/5e/bR91gXKP_o.png"
                }
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "12px",
              marginTop: "10px",
              justifyContent: "space-between",
              width: "100%",
              color: "rgb(59, 55, 191)",
            }}
          >
            <div></div>
            <div style={{ display: "flex" }}>
              Get Yours{" "}
              <span
                style={{
                  marginLeft: "4px",
                  textDecoration: "underline",
                }}
              >
                @githubwrapped.netlify.app
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 820,
        height: 600,
      }
    );
  } catch {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            fontSize: 32,
            fontWeight: 600,
            color: "rgb(59, 55, 191)",
          }}
        >
          <div style={{ display: "flex" }}>
            <svg
              stroke="rgb(59, 55, 191)"
              fill="rgb(59, 55, 191)"
              stroke-width="0"
              viewBox="0 0 496 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
            </svg>
          </div>
          <div style={{ marginTop: 10 }}> #GithubWrapped - 2022</div>
          <div style={{ marginTop: 10, fontSize: "20px" }}>
            How did you contribute in 2022
          </div>
          <div style={{ marginTop: 10, fontSize: "16px" }}>
            Get your Total contriburtion, Active days, longest streak, Most
            active day, month and more
          </div>
          <div style={{ display: "flex", marginTop: 10, fontSize: "16px" }}>
            Get Yours{" "}
            <span
              style={{
                marginLeft: "4px",
              }}
            >
              @https://githubwrapped.netlify.app
            </span>
          </div>
        </div>
      ),
      {
        width: 820,
        height: 600,
      }
    );
  }
};
