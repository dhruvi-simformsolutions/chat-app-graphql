import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_USERS } from "../utils/graphql";
import { useNavigate } from 'react-router-dom';
import { Grid, Transition, Card, Button, Icon } from "semantic-ui-react";
import moment from "moment";
import MenuBar from "../components/MenuBar"
 function Home() {
  const [userList,setUserList] = useState([])
    const history = useNavigate();
  const { user } = useContext(AuthContext);
  const { data } = useQuery(FETCH_USERS, { variables: { id: user?.id } });
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);
  useEffect(()=>{
    if(data?.getUsers){
      setUserList(data?.getUsers)
    }
  },[data])
  const onChatClick=(id,username) =>{
    history('/chat',{state : {id,username}})
  }
  return (
    <>
     <MenuBar/>
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Users</h1>
      </Grid.Row>
      <Grid.Row>
        <Transition.Group>
          {userList.length > 0 &&
            userList.map((users, index) => (
              <Grid.Column key={index} style={{ marginBottom: "20px" }}>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>{users.username}</Card.Header>
                    <Card.Meta>
                      {moment(users.createdAt).fromNow(true)}
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                    <Button labelPosition="right">
                      <Button color="blue" basic onClick={() =>onChatClick(users.id,users?.username)}>
                        <Icon name="chat" />
                      </Button>
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
        </Transition.Group>
      </Grid.Row>
    </Grid>
    </>
  );
}

export default Home;
