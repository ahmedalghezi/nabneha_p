import React, { Component } from 'react';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import {StyleSheet} from "react-native";

class MyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: [],
            tableData: [],
        }
    }

    componentWillMount() {
        this.setState({
            tableHead: this.props.headers,
            tableData: this.props.rows,
        });
    }

    render() {
        const { rowData } = this.props;
        const headers = Object.keys(rowData);
        const rows = Object.values(rowData);
        return (
            <View>
                <View style={styles.headerContainer}>
                    {headers.map((header, index) => (
                        <Text key={index} style={styles.headerText}>
                            {header}
                        </Text>
                    ))}
                </View>
                <View style={styles.rowsContainer}>
                    {rows.map((row, index) => (
                        <View key={index} style={styles.rowContainer}>
                            {row.map((data, i) => (
                                <Text key={i} style={styles.rowText}>
                                    {data}
                                </Text>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    table: {
        borderCollapse: 'collapse',
        margin: 25,
        fontSize: 0.9,
        fontFamily: 'sans-serif',
        minWidth: 300,
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
    },
    thead: {
        backgroundColor: '#009879',
        color: '#ffffff',
        textAlign: 'center',
    },
    th: {
        padding: 12,
    },
    td: {
        padding: 12,
    },
    tbody: {
        borderBottom: '1px solid #dddddd',
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
});

export default MyTable;
