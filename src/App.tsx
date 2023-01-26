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
  Input,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Stack,
  Image,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";

interface Activity {
  activity: string;
  participants: number;
}

function App() {
  const [activity, setActivity] = useState<Activity>();
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState("");

  const fetchActivityData = () => {
    setLoading(true);
    fetch(`http://www.boredapi.com/api/activity?participants=${participants}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setActivity(data);
      });
  };
  useEffect(() => {
    if (participants) {
      fetchActivityData();
      setLoading(false);
    }
  }, [participants]);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <Box display="flex">
      <Card
        overflow="hidden"
        border="1px solid #000"
        margin="auto"
      >
        <Stack>
          <CardBody>
            {activity && (
              <Box>
                <Heading size="xs">{activity.activity}</Heading>
                <Text>boring people: {activity.participants}</Text>
              </Box>
            )}
          </CardBody>

          <Input
            type="number"
            value={participants}
            onChange={(e) => {
              setParticipants(e.target.value);
            }}
            max={5}
            required={false}
            placeholder="how many boring people?"
          />

          <CardFooter>
            <Image
              src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/d6649a62874689.5a9ea800b1d58.jpg"
              alt="bored"
            />
          </CardFooter>
        </Stack>
      </Card>
    </Box>
  );
}

export default App;
