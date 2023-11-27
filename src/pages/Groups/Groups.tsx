import { useEffect, useRef, useState } from "react";
import { Button, RouterButton } from "../../components/Button";
import Header from "../../components/Header";
import MainLayout from "../../components/MainLayout";
import { Card, ClickableCard, EventCard, Title } from "../../components/Card";
import WidthSpaced from "../../components/WidthSpaced";
import { Conn } from "../../ws";
import { Group, GroupState, Member, Message, MessageType, Preferences } from "../../model/model";
import { nanoid } from "nanoid";
import { TextInput } from "../../components/Forms";
import FloatingFooter from "../../components/FloatingFooter";
import localforage from "localforage";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import image1 from "../../assets/images/people/image1.png";
import image2 from "../../assets/images/people/image2.png";
import image3 from "../../assets/images/people/image3.png";
import image4 from "../../assets/images/people/image4.png";
import image5 from "../../assets/images/people/image5.png";
import image6 from "../../assets/images/people/image6.png";

const getGroup = (groups: Group[], id: string) => {
  return groups.filter((group: Group) => group.id === id)[0];
};

const removeDuplicates = (array: Array<any>) => {
  const newArray: any = [];

  while (array.length > 0) {
    const top = array.pop();

    if (!newArray.includes(top)) {
      newArray.push(top);
    }
  }

  return newArray;
};

const setPreferences = (group: Group) => {
  localforage.setItem("preference-budget", group.preferences.budget);
  localforage.setItem("preference-categories", removeDuplicates(group.preferences.categories));
  localforage.setItem("preference-time", group.preferences.time);
  localforage.setItem("preference-transport", group.preferences.transport);
};

const PersonFilledSvg = (
  <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.5 16.5C14.9875 16.5 13.6927 15.9615 12.6156 14.8844C11.5385 13.8073 11 12.5125 11 11C11 9.4875 11.5385 8.19271 12.6156 7.11563C13.6927 6.03854 14.9875 5.5 16.5 5.5C18.0125 5.5 19.3073 6.03854 20.3844 7.11563C21.4615 8.19271 22 9.4875 22 11C22 12.5125 21.4615 13.8073 20.3844 14.8844C19.3073 15.9615 18.0125 16.5 16.5 16.5ZM5.5 24.75V23.65C5.5 22.8708 5.70052 22.1547 6.10156 21.5016C6.5026 20.8484 7.03542 20.35 7.7 20.0063C9.12083 19.2958 10.5646 18.763 12.0312 18.4078C13.4979 18.0526 14.9875 17.875 16.5 17.875C18.0125 17.875 19.5021 18.0526 20.9688 18.4078C22.4354 18.763 23.8792 19.2958 25.3 20.0063C25.9646 20.35 26.4974 20.8484 26.8984 21.5016C27.2995 22.1547 27.5 22.8708 27.5 23.65V24.75C27.5 25.5063 27.2307 26.1536 26.6922 26.6922C26.1536 27.2307 25.5063 27.5 24.75 27.5H8.25C7.49375 27.5 6.84635 27.2307 6.30781 26.6922C5.76927 26.1536 5.5 25.5063 5.5 24.75Z"
      fill="#781803"
    />
  </svg>
);

const GroupSvg = (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_167_337)">
      <path
        d="M0 24.0833V23.2688C0 22.2535 0.519444 21.4271 1.55833 20.7896C2.59722 20.1521 3.96667 19.8333 5.66667 19.8333C5.97361 19.8333 6.26875 19.8392 6.55208 19.851C6.83542 19.8628 7.10694 19.8924 7.36667 19.9396C7.03611 20.4354 6.78819 20.9549 6.62292 21.4979C6.45764 22.041 6.375 22.6076 6.375 23.1979V25.5H1.41667C1.01528 25.5 0.678819 25.3642 0.407292 25.0927C0.135764 24.8212 0 24.4847 0 24.0833ZM8.5 24.0833V23.1979C8.5 22.4424 8.7066 21.7517 9.11979 21.126C9.53299 20.5003 10.1174 19.9514 10.8729 19.4792C11.6285 19.0069 12.5316 18.6528 13.5823 18.4167C14.633 18.1806 15.7722 18.0625 17 18.0625C18.2514 18.0625 19.4024 18.1806 20.4531 18.4167C21.5038 18.6528 22.4069 19.0069 23.1625 19.4792C23.9181 19.9514 24.4965 20.5003 24.8979 21.126C25.2993 21.7517 25.5 22.4424 25.5 23.1979V24.0833C25.5 24.4847 25.3642 24.8212 25.0927 25.0927C24.8212 25.3642 24.4847 25.5 24.0833 25.5H9.91667C9.51528 25.5 9.17882 25.3642 8.90729 25.0927C8.63576 24.8212 8.5 24.4847 8.5 24.0833ZM27.625 25.5V23.1979C27.625 22.584 27.5483 22.0056 27.3948 21.4625C27.2413 20.9194 27.0111 20.4118 26.7042 19.9396C26.9639 19.8924 27.2295 19.8628 27.501 19.851C27.7726 19.8392 28.05 19.8333 28.3333 19.8333C30.0333 19.8333 31.4028 20.1462 32.4417 20.7719C33.4806 21.3976 34 22.2299 34 23.2688V24.0833C34 24.4847 33.8642 24.8212 33.5927 25.0927C33.3212 25.3642 32.9847 25.5 32.5833 25.5H27.625ZM5.66667 18.4167C4.8875 18.4167 4.22049 18.1392 3.66562 17.5844C3.11076 17.0295 2.83333 16.3625 2.83333 15.5833C2.83333 14.7806 3.11076 14.1076 3.66562 13.5646C4.22049 13.0215 4.8875 12.75 5.66667 12.75C6.46944 12.75 7.14236 13.0215 7.68542 13.5646C8.22847 14.1076 8.5 14.7806 8.5 15.5833C8.5 16.3625 8.22847 17.0295 7.68542 17.5844C7.14236 18.1392 6.46944 18.4167 5.66667 18.4167ZM28.3333 18.4167C27.5542 18.4167 26.8872 18.1392 26.3323 17.5844C25.7774 17.0295 25.5 16.3625 25.5 15.5833C25.5 14.7806 25.7774 14.1076 26.3323 13.5646C26.8872 13.0215 27.5542 12.75 28.3333 12.75C29.1361 12.75 29.809 13.0215 30.3521 13.5646C30.8951 14.1076 31.1667 14.7806 31.1667 15.5833C31.1667 16.3625 30.8951 17.0295 30.3521 17.5844C29.809 18.1392 29.1361 18.4167 28.3333 18.4167ZM17 17C15.8194 17 14.816 16.5868 13.9896 15.7604C13.1632 14.934 12.75 13.9306 12.75 12.75C12.75 11.5458 13.1632 10.5365 13.9896 9.72187C14.816 8.90729 15.8194 8.5 17 8.5C18.2042 8.5 19.2135 8.90729 20.0281 9.72187C20.8427 10.5365 21.25 11.5458 21.25 12.75C21.25 13.9306 20.8427 14.934 20.0281 15.7604C19.2135 16.5868 18.2042 17 17 17Z"
        fill="#781803"
      />
    </g>
    <defs>
      <clipPath id="clip0_167_337">
        <rect width="34" height="34" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const SearchingSvg = (
  <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="66" height="66" rx="14" stroke="#FFEED6" strokeWidth="4" />
    <path
      d="M40.1021 14.075C39.5424 20.9639 36.8299 26.8517 31.9646 31.7385C27.0993 36.6253 21.2437 39.3917 14.3979 40.0375C13.666 40.1236 13.0417 39.9191 12.525 39.424C12.0083 38.9288 11.75 38.3153 11.75 37.5833C11.75 36.8514 11.9868 36.2378 12.4604 35.7427C12.934 35.2476 13.5368 34.9569 14.2687 34.8708C19.7368 34.2681 24.3976 32.0184 28.251 28.1219C32.1045 24.2253 34.3111 19.5215 34.8708 14.0104C34.9569 13.3215 35.2583 12.7726 35.775 12.3635C36.2917 11.9545 36.8944 11.75 37.5833 11.75C38.3153 11.75 38.9396 11.976 39.4562 12.4281C39.9729 12.8802 40.1882 13.4292 40.1021 14.075ZM29.7042 14.075C29.1875 18.1222 27.4868 21.5882 24.6021 24.4729C21.7174 27.3576 18.2514 29.0799 14.2042 29.6396C13.5153 29.7257 12.934 29.5319 12.4604 29.0583C11.9868 28.5847 11.75 27.9819 11.75 27.25C11.75 26.5611 11.9545 25.9583 12.3635 25.4417C12.7726 24.925 13.3215 24.6021 14.0104 24.4729C16.7229 23.9993 19.0264 22.783 20.9208 20.824C22.8153 18.8649 23.9993 16.5292 24.4729 13.8167C24.559 13.1708 24.8712 12.6649 25.4094 12.299C25.9476 11.933 26.5611 11.75 27.25 11.75C27.9819 11.75 28.5955 11.976 29.0906 12.4281C29.5858 12.8802 29.7903 13.4292 29.7042 14.075ZM32.4167 58.25C31.6847 58.25 31.0712 57.9917 30.576 57.475C30.0809 56.9583 29.8764 56.334 29.9625 55.6021C30.6083 48.7562 33.3747 42.9007 38.2615 38.0354C43.1483 33.1701 49.0361 30.4576 55.925 29.8979C56.5708 29.8118 57.1198 30.0271 57.5719 30.5437C58.024 31.0604 58.25 31.6847 58.25 32.4167C58.25 33.1056 58.0455 33.7083 57.6365 34.225C57.2274 34.7417 56.6785 35.0431 55.9896 35.1292C50.4785 35.6889 45.7747 37.8955 41.8781 41.749C37.9816 45.6024 35.7319 50.2632 35.1292 55.7312C35.0431 56.4632 34.7524 57.066 34.2573 57.5396C33.7622 58.0132 33.1486 58.25 32.4167 58.25ZM42.75 58.25C42.0181 58.25 41.4153 58.0132 40.9417 57.5396C40.4681 57.066 40.2743 56.4847 40.3604 55.7958C40.9201 51.7486 42.6424 48.2826 45.5271 45.3979C48.4118 42.5132 51.8778 40.8125 55.925 40.2958C56.5708 40.2097 57.1198 40.4142 57.5719 40.9094C58.024 41.4045 58.25 42.0181 58.25 42.75C58.25 43.4389 58.067 44.0524 57.701 44.5906C57.3351 45.1288 56.8292 45.441 56.1833 45.5271C53.4708 46.0007 51.1351 47.1847 49.176 49.0792C47.217 50.9736 46.0007 53.2771 45.5271 55.9896C45.3979 56.6785 45.075 57.2274 44.5583 57.6365C44.0417 58.0455 43.4389 58.25 42.75 58.25ZM18.2083 14.9792C18.2083 15.8833 17.8962 16.6476 17.2719 17.2719C16.6476 17.8962 15.8833 18.2083 14.9792 18.2083C14.075 18.2083 13.3108 17.8962 12.6865 17.2719C12.0622 16.6476 11.75 15.8833 11.75 14.9792C11.75 14.075 12.0622 13.3108 12.6865 12.6865C13.3108 12.0622 14.075 11.75 14.9792 11.75C15.8833 11.75 16.6476 12.0622 17.2719 12.6865C17.8962 13.3108 18.2083 14.075 18.2083 14.9792ZM58.25 55.0208C58.25 55.925 57.9378 56.6892 57.3135 57.3135C56.6892 57.9378 55.925 58.25 55.0208 58.25C54.1167 58.25 53.3524 57.9378 52.7281 57.3135C52.1038 56.6892 51.7917 55.925 51.7917 55.0208C51.7917 54.1167 52.1038 53.3524 52.7281 52.7281C53.3524 52.1038 54.1167 51.7917 55.0208 51.7917C55.925 51.7917 56.6892 52.1038 57.3135 52.7281C57.9378 53.3524 58.25 54.1167 58.25 55.0208Z"
      fill="#FFEED6"
    />
  </svg>
);

export function Groups() {
  const [leaveButton, setLeaveButton] = useState<boolean>(false);
  useEffect(() => {
    const membersStored = localStorage.getItem("members");

    if (membersStored) {
      setLeaveButton(true);
    }
  }, []);

  const navigate = useNavigate();

  const leaveGroup = () => {
    localStorage.setItem("members", "");
    navigate("/map");
  };

  return (
    <>
      <Header>
        <h1>Groups</h1>
      </Header>
      <MainLayout>
        <RouterButton to="/groups/create">Create Group</RouterButton>
        <RouterButton to="/groups/join">Join Group</RouterButton>
        {leaveButton ? (
          <Button onClick={leaveGroup} variant="error">
            Leave Group
          </Button>
        ) : (
          <></>
        )}
      </MainLayout>
      <FloatingFooter>
        <Button onClick={() => navigate("/map")} variant="outlined" nospacing>
          Back to Map
        </Button>
      </FloatingFooter>
    </>
  );
}

const createGroup = (group: Group) => {
  const message: Message = {
    type: MessageType.CreateGroup,
    payload: [group],
    id: group.id,
  };

  Conn.send(JSON.stringify(message));
};

export function CreateGroup() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [thisId, setId] = useState("");

  // Conn.onmessage = (evt: any) => {
  //     // update members list
  //     const message: Message = JSON.parse(evt.data)

  //     console.log("CreateGroup", message.type)
  //     if (message.type === MessageType.CreateGroup) {
  //     } else if (message.type === MessageType.JoinGroup) {
  //         setGroups(message.payload)
  //         const group = getGroup(message.payload, message.id)
  //         setPreferences(group[0])
  //     } else if (message.type === MessageType.ChangeState) {
  //         setGroups(message.payload)
  //     }
  // }

  const readyGroup = () => {
    groups.forEach((group: Group) => {
      if (group.id === thisId) {
        group.state = GroupState.Ready;
      }
    });

    const message: Message = {
      id: thisId,
      payload: groups,
      type: MessageType.ChangeState,
    };

    Conn.send(JSON.stringify(message));

    window.location.href = "/map";
  };

  return (
    <>
      <Header>
        <h1>Group Created</h1>
      </Header>
      <MainLayout>
        {groups
          .filter((group: Group) => group.id === thisId)
          .map((group: Group, i: number) => {
            return (
              <Card key={i}>
                <WidthSpaced>
                  <Title>{group.name}</Title>
                  <div>
                    {group.members.map((member: string, i: number) => {
                      return <p key={i}>{member}</p>;
                    })}
                  </div>
                </WidthSpaced>
              </Card>
            );
          })}
      </MainLayout>
      <FloatingFooter>
        <Button onClick={readyGroup} variant="outlined" nospacing>
          Ready
        </Button>
      </FloatingFooter>
    </>
  );
}

const dummyGroups: Group[] = [
  {
    id: "0987654321",
    name: "Angel's Group",
    members: [
      {
        name: "Angel",
        img: "image1",
        vote: 1,
      },
      {
        name: "Michael",
        img: "image2",
        vote: 2,
      },
    ],
    preferences: {
      budget: "3",
      categories: ["BBQ", "American"],
      time: "32",
      transport: "driving",
    },
    state: GroupState.Available,
  },
  {
    id: "1234567890",
    name: "Kenan's Group",
    members: [
      {
        name: "Kenan",
        img: "image6",
        vote: 1,
      },
      {
        name: "Frank",
        img: "image3",
        vote: 1,
      },
    ],
    preferences: {
      budget: "4",
      categories: ["Fast Food", "Bakery"],
      time: "50",
      transport: "driving",
    },
    state: GroupState.Available,
  },
];

const addPreferences = async (groupPreferences: Preferences): Promise<Preferences> => {
  const budget: number = Number(await localforage.getItem("preference-budget")!);
  groupPreferences.budget = String(((Number(groupPreferences.budget) + budget) / 2).toFixed(0));

  const categories: string[] = await localforage.getItem("preference-categories")!;
  groupPreferences.categories = [...groupPreferences.categories, ...categories];

  const time: number = Number(await localforage.getItem("preference-time")!);
  groupPreferences.time = String(((Number(groupPreferences.time) + time) / 2).toFixed(0));

  const transport: string = await localforage.getItem("preference-transport")!;

  if (groupPreferences.transport === "driving" || transport === "driving") {
    groupPreferences.transport = "driving";
  } else if ((groupPreferences.transport === "biking" && transport === "walking") || (groupPreferences.transport === "walking" && transport === "biking")) {
    groupPreferences.transport = "walking";
  }

  return groupPreferences;
};

export function JoinGroup() {
  const [groups, setGroups] = useState<Group[]>(dummyGroups);
  const [current, setCurrent] = useState<string | null>(null);

  /* this useEffect hook is for simulating *finding a group in 3 seconds* */
  useEffect(() => {
    const addGroup = () => {
      setGroups((prevGroups) => {
        prevGroups.push({
          id: "0293487989",
          name: "Jessica's Group",
          members: [
            {
              name: "Jessica",
              img: "image5",
            },
            {
              name: "Becca",
              img: "image4",
            },
          ],
          preferences: {
            budget: "4",
            categories: ["Fine Dining"],
            time: "50",
            transport: "driving",
          },
          state: GroupState.Available,
        });
        return [...prevGroups];
      });
    };

    const timeout = setTimeout(addGroup, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const joinedGroup = (e: any) => {
    const id = e.target.classList.contains("event") ? e.target.id : e.target.closest(".event").id;
    setCurrent(id);

    const name = localStorage.getItem("name")!;
    const image = localStorage.getItem("img")!;

    groups.forEach((group: Group, i: number) => {
      if (group.id === id) {
        groups[i].members.push({
          name: name,
          img: image,
        });
      } else {
        groups[i].members = groups[i].members.filter((member: Member) => member.name !== name);
      }
    });

    // we need to remove all other instances of member

    setGroups(groups);
  };

  const readyGroup = () => {
    localStorage.setItem("members", JSON.stringify(getGroup(groups, current!).members));

    navigate("/map");
  };

  const navigate = useNavigate();

  return (
    <>
      <Header>
        <h1>Groups Nearby</h1>
      </Header>
      <MainLayout>
        <div className={styles["searching"]}>
          {SearchingSvg}
          <p>
            {current ? (
              "Group Selected"
            ) : (
              <>
                Looking for groups nearby
                <span className={styles["first"]}>.</span>
                <span className={styles["second"]}>.</span>
                <span className={styles["third"]}>.</span>
              </>
            )}
          </p>
        </div>
        {groups.map((group: Group, key: number) => {
          return (
            <EventCard key={key} eventHandler={joinedGroup} id={group.id} variant={current === group.id ? "active" : undefined}>
              <WidthSpaced>
                <Title>
                  <div className={styles["center"]}>
                    <span className={styles["center"]}>{GroupSvg}</span>
                    {group.name}
                  </div>
                </Title>
              </WidthSpaced>
              <div>
                {group?.members.map((member: Member, i: number) => {
                  return (
                    <p key={i}>
                      <span className={styles["center"]}>
                        {PersonFilledSvg}
                        {member.name}
                      </span>
                    </p>
                  );
                })}
              </div>
            </EventCard>
          );
        })}
      </MainLayout>
      <FloatingFooter>
        <Button onClick={() => navigate(-1)} variant="outlined" nospacing>
          Back
        </Button>

        <Button onClick={readyGroup} variant={current ? "acrylic-active" : "disabled"} nospacing>
          Join
        </Button>
      </FloatingFooter>
    </>
  );
}

const allImgs = new Array(6).fill("");

export function CreateProfile() {
  const inputRef = useRef<HTMLInputElement>();

  // const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(1);

  useEffect(() => {
    const name = localStorage.getItem("name");
    inputRef.current!.value = name!;

    if (name) {
      // navigate("/groups");
    } else {
      localStorage.setItem("img", "image1");
    }
  }, []);

  const onChangeCallback = () => {
    const newName: string = inputRef.current!.value;

    localStorage.setItem("name", newName);
  };

  const chooseImage = (e) => {
    const num = Number(e.target.id);

    if (num === 0) return;

    localStorage.setItem("img", "image" + num);
    setSelectedImg(num);
  };

  return (
    <>
      <Header>
        <h1>Group Profile</h1>
      </Header>
      <MainLayout>
        <p>Please enter a name that will be shown to people in other groups.</p>
        <label>Your Name</label>
        <TextInput onChange={onChangeCallback} inputRef={inputRef} placeholder="Name" />

        <label>Select a profile photo</label>
        <div className={styles["img-box"]} onClick={chooseImage}>
          {allImgs.map((_, i: number) => {
            console.log(i);
            i += 1;
            if (i === 1) {
              return <img className={styles[selectedImg === i ? "selected" : ""]} key={i} id={String(i)} src={image1} />;
            } else if (i === 2) {
              return <img className={styles[selectedImg === i ? "selected" : ""]} key={i} id={String(i)} src={image2} />;
            } else if (i === 3) {
              return <img className={styles[selectedImg === i ? "selected" : ""]} key={i} id={String(i)} src={image3} />;
            } else if (i === 4) {
              return <img className={styles[selectedImg === i ? "selected" : ""]} key={i} id={String(i)} src={image4} />;
            } else if (i === 5) {
              return <img className={styles[selectedImg === i ? "selected" : ""]} key={i} id={String(i)} src={image5} />;
            } else if (i === 6) {
              return <img className={styles[selectedImg === i ? "selected" : ""]} key={i} id={String(i)} src={image6} />;
            }
          })}
        </div>
      </MainLayout>

      <FloatingFooter>
        {localStorage.getItem("name") ? (
          <RouterButton to="/preferences" nospacing>
            Done
          </RouterButton>
        ) : (
          <RouterButton to="/groups" nospacing>
            Next
          </RouterButton>
        )}
      </FloatingFooter>
    </>
  );
}
