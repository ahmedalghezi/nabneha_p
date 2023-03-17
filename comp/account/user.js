import {Component} from "react";
import {View,StyleSheet,Text} from "react-native";
import Amount from "./amount";
import Balance from "./balance";
import {styles} from "./recieve";
import QRCode from "react-native-qrcode-svg";

import {Card} from "react-native-paper";
import {Button} from "@rneui/themed";

class User extends Component{

    constructor(props) {
        super(props);
        this.state = {
            longCode: "no code",
            shortCode:"no code",
            selectedBtn:"pay",
            changeCount:0,
        };
    }

    componentDidMount() {
        if(this.props.transferCount){
            this.setState({changeCount:this.props.transferCount});
        }
    }


    onUpdateLongCode = (longCode) =>{
        this.setState({longCode:longCode});
    }
    onUpdateShortCode = (shortCode) =>{
        this.setState({shortCode:shortCode});
    }
    handleBtn = (btnName) =>{
        this.setState({selectedBtn:btnName});
    }

    render() {
        return (


            <View style={styles2.container}>


                <Balance  transferCount={this.props.transferCount} onUpdateLongCode={this.onUpdateLongCode} onUpdateShortCode={this.onUpdateShortCode}/>

                <View style={styles.panel}>
                    <Button name ={"pay"} type={this.state.selectedBtn==="pay"?"solid":"outline"} title={"ادفع"}  onPress={() => this.handleBtn("pay")}/>
                    <Button name ={"get"} type={this.state.selectedBtn==="get"?"solid":"outline"} title={"استلم"} onPress={() => this.handleBtn("get")}/>
                </View>

                {this.state.selectedBtn === "pay" && <Text style={[{width: '100%'},styles2.text]}> للدفع من خلال المحفظة يرجى استخدام الكود التالي</Text>}
                {this.state.selectedBtn !== "pay" && <Text style={[{width: '100%'},styles2.text]}> لاستلام التحويل يرجى قراءة الكود التالي</Text>}

                {this.state.selectedBtn === "pay" && <View style={styles2.qrCodeContainer}>
                    {this.state.longCode !== "" && <QRCode value={this.state.longCode} size={200} color="#000000"
                        backgroundColor="#ffffff" />}
                </View>}

                {this.state.selectedBtn !== "pay" && <View style={styles2.qrCodeContainer}>
                    {this.state.shortCode !== "" && <QRCode value={this.state.shortCode} size={200} color="#000000"
                                                               backgroundColor="#ffffff" />}
                </View>}
            </View>

/*
            <View style={styles.container}>
                <Balance onUpdateReceiveCode={this.onUpdateReceiveCode}/>

                {this.state.receiverCode !== "" && <QRCode value={this.state.receiveCode} size={200} color="#000000" backgroundColor="#ffffff" />}


        </View>*/
        );

    }
}

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    text: {
        fontSize: 18,
        marginVertical: 20,
        textAlign:"right"
    },
    qrCodeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    cardContainer: {
        width: '100%',
    },
});

export default User;
