import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";

interface Activity {
  activity: string;
  accessibility: number;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
}

function App() {
  const [activities, setActivities] = useState<Activity>();
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState("");

  const fetchActivityData = () => {
    fetch(`https://www.boredapi.com/api/activity?participants=${participants}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setActivities(data);
      });
  };
  useEffect(() => {
    fetchActivityData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participants]);

  if (loading) {
    return <div>loading</div>;
  }

  if (!activities) return null;

  return (
    <div>
      {Object.keys(activities).map((key) => (
        <li key={key}>
          <b>{key}</b> : {activities[key as keyof Activity]}
        </li>
      ))}
      <label>
        Participants:
        <input
          type="number"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          max={5}
          required={false}
          placeholder="max. 6 participants "
        />
      </label>
    </div>
  );
}

export default App;
