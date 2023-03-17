



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {Table, TableWrapper, Row} from 'react-native-table-component';

//
import SampleTable from "../util/myTable";
import Post from "../../DB/post";
import {useNavigation} from "@react-navigation/native";



export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [started, setStarted]  = useState(false);



    useEffect(() => {

        if (started)
            return;
        setStarted(true);
        // setTransactions(process(getSample()));
        getTransactions();

    });

    const getTransactions = async () => {

        Post.post("/jizdan/getTransactions",{}).then(async response => {
            let data = response.data;
            if (data.res === "empty") {
                return"";
                //data = getSample();
            }
            setTransactions(process(data.data));
            return "";
        });
        /*const response = await fetch(`https://inprove-sport.info/jizdan/getTransactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ owner_id: 1, code:personalCode }),
        });
        let data = await response.json();
        if (data.res === "empty") {
            data = getSample();
        }
        setTransactions(process(data));
        return "";*/
    };

    return (
        <View style={styles.container}>
            {transactions && transactions.length > 0 && <Text style={styles.header}>سجل المدفوعات والمستلمات</Text>}
            {transactions && transactions.length === 0 && <Text style={styles.header}>عذراً سجل المدفوعات فارغ حالياً</Text>}
            {!transactions && <Text style={styles.header}>جاري تحديث المعلومات</Text>}
            <ScrollView>
                {<SampleTable rowData={transactions}/>
                }
            </ScrollView>
        </View>
    );
};



const process = (arr) =>{
    const arrObj = [];
    for( let i = 0 ; i < arr.length ; i++){
        const obj = {};
        if(arr[i].tran_type === "Transfer") {
            //obj.name = arr[i].to_name;
            obj.مبلغ = -1 * arr[i].amount;
        }else {
           // obj.name = arr[i].from_name;
            obj.مبلغ =  arr[i].amount;
        }
        obj.الاسم = arr[i].name;
        obj.التاريخ = arr[i].time.split("T")[0];
        arrObj.push(obj);
    }
    return arrObj;
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    head: { height: 40, backgroundColor: '#f1f8ff',textAlign: 'center' },
    text: { margin: 6 ,textAlign: 'center'},
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1',textAlign: 'center' },
});





const getSample = () => {
    return [
        { id: 1, from_name: 'John', to_name: 'Mike', time: '2022-01-01 12:00:00', amount: 100, tran_type: 'Transfer' },
        { id: 2, from_name: 'Mike', to_name: 'Jane', time: '2022-01-02 12:00:00', amount: 200, tran_type: 'Transfer' },
        { id: 3, from_name: 'Jane', to_name: 'John', time: '2022-01-03 12:00:00', amount: 300, tran_type: 'Transfer' },
        { id: 4, from_name: 'John', to_name: 'Mike', time: '2022-01-04 12:00:00', amount: 100, tran_type: 'Transfer' },
        { id: 5, from_name: 'Mike', to_name: 'Jane', time: '2022-01-05 12:00:00', amount: 200, tran_type: 'Transfer' },
    ];
}

