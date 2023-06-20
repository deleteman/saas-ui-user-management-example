'use client';
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { DatePicker, DatePickerCalendar, DatePickerDialog, DatePickerTrigger } from "@saas-ui/date-picker";
import { Field, Form, FormLayout, SubmitButton, useSnackbar } from "@saas-ui/react";
import { useContext, useRef, useState } from "react";
import { CalendarIcon } from "@chakra-ui/icons";
import { userContext } from "@/components/UserContext";

function formatDate(dateString) {
  const dateParts = dateString.split('-');
  const year = dateParts[0];
  const month = parseInt(dateParts[1], 10);
  const day = parseInt(dateParts[2], 10);

  // Create an array of month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  // Format the date string
  const formattedDate = `${monthNames[month - 1]} ${day}, ${year}`;

  return formattedDate;
}



function createUser(name, enabled, address, birthdate) {
    return {
        name, 
        "enabled": enabled? "Yes": "No", 
        address, 
        birthdate: formatDate(birthdate)
    }
}


const RESET_TIMEOUT = 9000;
const INITIAL_BIRTHDATE = '24/10/1983'

export default function NewUser() {
    let {users} = useContext(userContext)
    const [userEnabled, setUserEnabled] = useState(false)
    const [birthdate, setBirthdate] = useState(INITIAL_BIRTHDATE)

    const snackbar = useSnackbar()

    let nameRef = useRef()
    let enabledRef = useRef()
    let addressRef = useRef()

    let interval = null;

    function resetForm(isTimeout) {
        if(!isTimeout) clearTimeout(interval)
        if (nameRef.current) nameRef.current.value = "";
        setUserEnabled(false)
        if (addressRef.current) addressRef.current.value = "";
        setBirthdate(INITIAL_BIRTHDATE)
    }

    function addUser () {
        const usr = createUser(nameRef.current.value,
                  userEnabled,
                  addressRef.current.value,
                  birthdate.toString()) 
        users.push(usr)
        snackbar({
            title: "User created!",
            description: "The user was created and it was added to the memory data store",
            status: 'success',
            duration: RESET_TIMEOUT,
            isClosable: true,
            onCloseComplete: resetForm
        })
        interval = setTimeout(() => {
            resetForm(true)
        }, RESET_TIMEOUT)
    }

    return (
        <Box p={4}>
        <Form onSubmit={addUser}>
            <FormLayout>
                <FormLayout columns={2}>
                    <Field
                        name="name"
                        label="Name"
                        ref={nameRef}
                        type="text"
                        rules={{required: true}}
                    />
                    <Field 
                        name="enabled"
                        ref={enabledRef}
                        label="User is enabled"
                        type="switch"
                        onChange={() => setUserEnabled(!userEnabled)}
                        value={userEnabled}
                    />
                </FormLayout>
                <Field
                    name="address"
                    ref={addressRef}
                    label="Address"
                    type="text"
                    rules={{required: true}}
                />
                <FormControl>
                    <FormLabel>Date of birth</FormLabel>
                <FormLayout columns={2}>
                    <Input 
                        type="date" 
                        value={birthdate}
                    />
                    <DatePicker onChange={setBirthdate}>
                        <DatePickerTrigger>
                            <Button>
                                <CalendarIcon />
                            </Button>
                        </DatePickerTrigger>
                        <DatePickerDialog>
                            <DatePickerCalendar />
                        </DatePickerDialog>
                        </DatePicker>
                </FormLayout>
                </FormControl>
                <SubmitButton>Create user</SubmitButton>
            </FormLayout>
        </Form>
        </Box>
    )
}