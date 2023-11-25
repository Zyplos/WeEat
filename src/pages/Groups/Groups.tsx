import { useEffect, useRef, useState } from "react"
import { Button, RouterButton } from "../../components/Button"
import Header from "../../components/Header"
import MainLayout from "../../components/MainLayout"
import { Card, ClickableCard, EventCard, Title } from "../../components/Card"
import WidthSpaced from "../../components/WidthSpaced"
import {Conn} from "../../ws"
import { Group, GroupState, Message, MessageType, Preferences } from "../../model/model"
import { nanoid } from "nanoid"
import { TextInput } from "../../components/Forms"
import FloatingFooter from "../../components/FloatingFooter"
import localforage from "localforage"

const getGroup = (groups: Group[], id: string) => {
    return groups.filter((group: Group) => group.id === id);
}

const removeDuplicates = (array: Array<any>) => {
    let newArray: any = [];


    while(array.length > 0) {
        const top = array.pop();


        if (!newArray.includes(top)) {
            newArray.push(top)
        }
    }

    return newArray
}

const setPreferences = (group: Group) => {
    localforage.setItem("preference-budget", group.preferences.budget)
    localforage.setItem("preference-categories", removeDuplicates(group.preferences.categories))
    localforage.setItem("preference-time", group.preferences.time)
    localforage.setItem("preference-transport", group.preferences.transport)
}

export function Groups() {

    return  <>
    <Header>
      <h1>Groups</h1>
    </Header>
    <MainLayout>
      <RouterButton to="/groups/create">Create Group</RouterButton>
      <RouterButton to="/groups/join">Join Group</RouterButton>
    </MainLayout>
  </>
}

const createGroup = (group: Group) => {
 
    const message: Message  = {
        type: MessageType.CreateGroup,
        payload: [group],
        id: group.id
    }
    
    Conn.send(JSON.stringify(message))   
}

export function CreateGroup() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [thisId, setId] = useState("");
    
 
    useEffect(() => {
        const myName = localStorage.getItem("name")!;
        const id = nanoid();
        setId(id)


        const sendCreateGroup = async () => {

            const groupName = (await (await fetch("https://random-word-api.herokuapp.com/word?number=2")).json()).join(" ")

            const group: Group = {
                name: groupName,
                members: [myName],
                preferences: {
                    budget: await localforage.getItem("preference-budget")!,
                    categories: await localforage.getItem("preference-categories")!,
                    time: await localforage.getItem("preference-time")!,
                    transport: await localforage.getItem("preference-transport")!,
                },
                id: id,
                state: GroupState.Ready
            }

            setGroups([group])
    
            console.log("create group")
            //Conn.onopen = () => {
            createGroup(group)     
                //return;
            
        }

        sendCreateGroup();

        
    }, [])
    
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
        })

        const message: Message = {
            id: thisId,
            payload: groups,
            type: MessageType.ChangeState
        }

        Conn.send(JSON.stringify(message));

       window.location.href = "/map"
    }

    return  <>
    <Header>
    <h1>Group Created</h1>
  </Header>
  <MainLayout>
{groups
  .filter((group: Group) =>  group.id === thisId)
  .map((group: Group, i: number) => {
    return <Card key={i}>
        <WidthSpaced>
    <Title>{group.name}</Title>
        <div>
            {group.members.map((member: string, i: number) => {
                return <p key={i}>{member}</p>
            })}
        </div>
        </WidthSpaced>
    </Card>
  })}

  </MainLayout>
  <FloatingFooter>
        <Button onClick={readyGroup} variant="outlined" nospacing>
        Ready
        </Button>
      </FloatingFooter>
    </>
}


export function JoinGroup({groups, setGroups}) {

    //useEffect(() => {}, [setGroups])
    const addPreferences = async (groupPreferences: Preferences): Promise<Preferences> => {
        const budget: number = Number(await localforage.getItem("preference-budget")!)
        groupPreferences.budget = String(((Number(groupPreferences.budget) + budget)/2).toFixed(0) )

        const categories: string[] = await localforage.getItem("preference-categories")! 
        groupPreferences.categories = [...groupPreferences.categories, ...categories]

        const time: number = Number(await localforage.getItem("preference-time")!)
        groupPreferences.time = String(((Number(groupPreferences.time) + time)/2).toFixed(0) )

        const transport: string = await localforage.getItem("preference-transport")!

        if (groupPreferences.transport === "driving" || transport === "driving") {
            groupPreferences.transport = "driving";
        } else if (groupPreferences.transport === "biking" && transport === "walking" ||
                    groupPreferences.transport === "walking" && transport === "biking") {
                        groupPreferences.transport = "walking"
        }

        return groupPreferences
    }

    const joinedGroup = (e) => {
        const targetID = e.target.id ? e.target.id : e.target.closest(".event").id

        const myName = localStorage.getItem("name")!

        let changedGroup = -1;
        groups.forEach((group: Group, i: number) => {
            if (group.id === targetID) {
                changedGroup = i;
                return
            }
        })

        const setChangedGroup = async () => {
            groups[changedGroup].members.push(myName)
            groups[changedGroup].preferences = await addPreferences(groups[changedGroup].preferences)

            const message: Message = {
                type: MessageType.JoinGroup,
                payload: groups,
                id: targetID
            }

            console.log(Conn)
            Conn.send(JSON.stringify(message))
        }
        setChangedGroup()

    }

    console.log(groups)

    return <>
    <Header>
    <h1>Available Groups</h1>
  </Header>
  <MainLayout>
    {groups.map((group: Group, key: number) => {
        return <EventCard key={key} eventHandler={joinedGroup} id={group.id}>
        <WidthSpaced>   
        <Title>{group.name}</Title>
        <div>
            {group?.members.map((member: string) => {
                return <p>{member}</p>
            })}
        </div>
        </WidthSpaced>
        </EventCard>
    })}
</MainLayout>
</>
}

export function CreateProfile() {  
    const inputRef = useRef<HTMLInputElement>();

    const onChangeCallback = () => {
        const newName: string = inputRef.current?.value!;

        localStorage.setItem("name", newName)
    }

    return  <MainLayout>
  <Header><h1>Create Profile</h1></Header>
  <TextInput onChange={onChangeCallback} inputRef={inputRef} placeholder="Name" />

  <RouterButton to="/groups" nospacing>
            Next
</RouterButton>
</MainLayout>
}