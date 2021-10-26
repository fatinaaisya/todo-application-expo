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

export default class Add extends Component {

  constructor(props) {
    super(props)

    this.state = {
        id: null,
        title: null,
        description: null,
        show: false,

    }
}

//method to save todo by calling API and making a POST call
saveToDo = () => {
  fetch('https://fc14-115-134-129-245.ngrok.io/api/todos', {
    method: 'POST',
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
    this.setDescription("")
    this.setTitle("");
    this.props.navigation.push('Home')

  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

//sets the show as true or false, for alert
setShow = (boolean) => {
  this.setState({show: boolean})
}
//set title variable on the current value
setTitle = (value) => {
  this.setState({title: value})
}

//set description variable on the current value
setDescription = (value) => {
  this.setState({description: value})
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
        <Heading color="emerald.600">Add ToDo</Heading>
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
          <Button colorScheme="rgb(60,179,113)" width={40} onPress={this.saveToDo} >Submit</Button>
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
            >{`You have successfully added!`}</Alert.Title>
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