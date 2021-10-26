import { StatusBar } from 'expo-status-bar';
import React , { Component, Keyboard }from 'react';
import {
    Input,
    Button,
    IconButton,
    VStack,
    HStack,
    Icon,
    Text,
    Collapse,
    Heading,
    CloseIcon,
    Alert,
    Center,
    NativeBaseProvider,
    KeyboardAvoidingView,
    Box,
    Pressable,
    themeTools
  } from "native-base";
import { MaterialCommunityIcons , MaterialIcons} from '@expo/vector-icons';

export default class Edit extends Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
        id: null,
        title: null,
        description: null,
        published: false,
        submitted: false,
        show: false,
        id: props.route.params.id
        // id: props.navigation.state.params.id
    }
}

//update method,calls API and updates the data
updateToDo = () => {
  fetch('https://fc14-115-134-129-245.ngrok.io/api/todos/' + this.state.id , {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title : this.state.title,
      description : this.state.description
    })
  }).then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    this.setShow(true);
    this.setDescription("")
    this.setTitle("");
 
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
 
//update title value basde on the current input
setTitle = (value) => {
    this.setState({title: value})
  }
 
//update description value basde on the current input
  setDescription = (value) => {
    this.setState({description: value})
  }
 
//fetches data when page is renderd
componentDidMount () {
  fetch('https://fc14-115-134-129-245.ngrok.io/api/todos/' + this.state.id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
    .then(data => {
        this.setTitle(data.title);
        this.setDescription(data.description);
      console.log('Success:', data);
 
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
 
//set show as true or false for alert
setShow = (boolean) => {
  this.setState({show: boolean})
}


render() {
return (
<NativeBaseProvider>
  <KeyboardAvoidingView h={{
        base: "600px",
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <Center flex={1}>
      <VStack space={4} flex={1} w="90%" mt={4}>
        <Heading color="emerald.600">Edit ToDo</Heading>
          <Input variant="filled"
            placeholder="Title"
            value={this.state.title}
            onChangeText={this.setTitle}
          />
          <Input variant="filled"
            placeholder="Description"
            value={this.state.description}
            onChangeText={this.setDescription}
            />
          <Center>
          <Button colorScheme="rgb(60,179,113)" width={40} onPress={this.updateToDo}>Update</Button>
          </Center>
      </VStack>
      <Collapse isOpen={this.state.show}>
        <Alert status="success" w="100%" 
        action={
            <IconButton
              icon={<CloseIcon size="xs" />}
              onPress={() => this.setShow(false)}
            />
          }
          actionProps={{
            alignSelf: "center",
          }}
          >
            <Alert.Icon />
            <Alert.Title
              flexShrink={1}
            >{`You have successfully updated!`}</Alert.Title>
        </Alert>
      </Collapse>
    </Center>
    </KeyboardAvoidingView>
    <Box flex={1}>
        <Center flex={1}>
        </Center>
        <HStack bg="emerald.500" alignItems="center" safeAreaBottom shadow={6}>
          <Pressable
            opacity={this.state.selected === 2 ? 1 : 0.6}
            py={2}
            flex={1}
            onPress={() => this.props.navigation.push('Home')}
          >
            <Center>
              <Icon
                mb={1}
                as={<MaterialIcons name="home" />}
                color="white"
                size="30px"
              />

              <Text color="white" fontSize={14}>Home</Text>
            </Center>
          </Pressable>
          <Pressable
            opacity={this.state.selected === 3 ? 1 : 0.5}
            py={2}
            flex={1}
            onPress={() => this.props.navigation.push('Add')}
          >
            <Center>
              <Icon
                mb={1}
                as={<MaterialCommunityIcons name="plus" />}
                color="white"
                size="30px"
              />
              <Text color="white" fontSize={14}>Add</Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>

   </NativeBaseProvider>
  );
}
}