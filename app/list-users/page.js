'use client'
import { userContext } from "@/components/UserContext";
import { InfoIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import { DataTable, EmptyState } from "@saas-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { Center, AbsoluteCenter } from "@chakra-ui/react";


export default function ListUsers(){
    let {users} = useContext(userContext)

    return (
        <>
        { (users.length > 0) && <Box overflowX="auto">
            <DataTable columns={[ {
                accessor: "name",
                Header: "Name", 
            }, 
            {
                accessor: "enabled", 
                Header: "Is Enabled?"
            }, 
            {
                accessor: 'address',
                Header: "Address"
            },
            {
                accessor: "birthdate",
                Header: "Birthdate"
            } ] } data={users} 
            isSortable={true}
            />
        </Box>
        }
        {users.length == 0 && <AbsoluteCenter axis="both">
            <EmptyState
            colorScheme="primary"
            icon={InfoIcon}
            title="No users to list yet"
            description="You haven't created any users yet."
            actions={
                <>
                <Link   href={'/new-user'}>
                    <Button colorScheme="primary">
                        Create new user
                    </Button>
                </Link>
                </>
            }
        /></AbsoluteCenter>
        }
        </>
    )
}