import React, { Component } from 'react';
import {
  Input,
  Button,
  IconButton,
  Checkbox,
  Text,
  VStack,
  Collapse,
  Alert,
  CloseIcon,
  HStack,
  KeyboardAvoidingView,
  Heading,
  Icon,
  Center,
  Box,
  Pressable,
  NativeBaseProvider
} from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      id: null,
      title: null,
      description: null,
      submitted: false,
      show: false,
      data: [],
    }
  }


  //to be captured when page is loaded API link to be replaced based on your api link
  componentDidMount() {
    this.fetchData();
  }

  fetchData(){
    fetch('https://fc14-115-134-129-245.ngrok.io/api/todos', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        this.setState({ data: data });
        console.log('Success:', data);

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  //to capture the value of title
  setTitle = (value) => {
    this.setState({ title: value })
  }

  //to set show as true or false
  setShow = (boolean) => {
    this.setState({ show: boolean })
  }

  //method to search based on the keyed infilled. API link to be replaced based on your api link

  search = () => {
    fetch('https://fc14-115-134-129-245.ngrok.io/api/todos' + '?title=' + this.state.title, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        this.setState({ data: data });
        console.log('Success:', data);

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  //change to edit page
  handleEdit = (id) => {
    this.props.navigation.push('Edit', { id })
  }


  //to delete from database
  handleDelete = (id, index) => {
    fetch('https://fc14-115-134-129-245.ngrok.io/api/todos/' + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.fetchData();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
              <Heading color="emerald.600">Todo App</Heading>
              <Input variant="filled"
                InputRightElement={
                  <IconButton
                    icon={<Icon as={FontAwesome5} name="search" size={4} />}
                    colorScheme="emerald"
                    ml={1}
                    onPress={() => {
                      this.search();
                    }}

                    mr={1} />

                }
                placeholder="Search Item"
                value={this.state.title}
                onChangeText={this.setTitle}
              />
              {this.state.data !== "null" || this.state.data !== "" || this.state.data !== undefined ?
              <VStack>
                {this.state.data.map((item, index) => (
                  <HStack
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    key={item.id}
                  >
                    <Checkbox
                      colorScheme="emerald"
                      value={item.title}
                    >
                      <Text width={70} flexWrap="wrap" mx={3}>
                        {item.title}
                      </Text>
                    </Checkbox>
                    <IconButton
                      colorScheme="emerald"
                      icon={<Icon as={FontAwesome5} name="edit" size={5} />}
                      onPress={() => this.handleEdit(item.id, index)}
                    />
                    <IconButton
                      colorScheme="emerald"
                      icon={<Icon as={FontAwesome5} name="trash" size={5} />}
                      onPress={() => this.handleDelete(item.id, index)}
                    />
                  </HStack>
                ))}
              </VStack>
            : 
            <Text color="black" fontSize={40}>There's no todo list</Text>
            }

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
              onPress={() => this.props.navigation.navigate('Home')}
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
              onPress={() => this.props.navigation.navigate('Add')}
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