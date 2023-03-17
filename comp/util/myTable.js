import { StyleSheet, View, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import {Component, useEffect, useState} from "react";



const styles = StyleSheet.create({
    table: {
        borderCollapse: 'collapse',
        margin: 5,
        fontSize: 0.9,
        fontFamily: 'sans-serif',
        minWidth: 100,
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',

    },
    thead: {
        backgroundColor: '#009879',
        color: '#ffffff',
        textAlign: 'center',

    },
    th: {
        padding: 8,
        textAlign: 'center'
    },
    td: {
        padding: 5,
        color:'#918989',
        textAlign: 'center',
    },
    tbody: {
        border: '1px solid',
        borderBottom: '1px solid #dddddd'
    },

    even: {
        backgroundColor: '#f3f3f3',
    },
    last: {
        borderBottom: '2px solid #009879',
    },
    active: {
        fontWeight: 'bold',
        color: '#009879',
    },
    negative:{
        color: '#A30000'
    }
});

export default class SampleTable extends Component{


    constructor(props) {
        super(props);
        this.state = {
            header: [],
            rows:[]
        };
    }
    componentDidMount() {
        this.updateTableParam();
    }
    updateTableParam = () => {
        if(this.props.rowData && this.props.rowData.length > 0){
            this.setHeader(Object.keys(this.props.rowData[0]));
            const vals = Object.values(this.props.rowData);
            const fArr = [];
            for(let i = 0 ; i < vals.length ; i++){
                const arr = Object.values(vals[i]);
                fArr.push(arr);
            }
            this.setRows(fArr);

        }else{

        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.rowData !== this.props.rowData) {
            this.updateTableParam();
        }
    }

    setHeader = (header) =>{
        this.setState({header:header});
    }

    setRows = (rows) =>{
        this.setState({rows:rows});
    }

    render() {
        return (
            <View>
                <Table style={styles.table}  >
                    <Row data={this.state.header} style={styles.thead} textStyle={{ color: 'white', ...styles.th}} />
                    <Rows data={this.state.rows} style={[styles.tbody, styles.even]} textStyle={styles.td} />
                </Table>
            </View>
        );
    }


};


