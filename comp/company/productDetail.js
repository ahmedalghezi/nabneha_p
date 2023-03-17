import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useRoute} from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Product from './product';

const html =
  '  <p  dir="rtl"><strong>مشروع</strong> <strong>مياه</strong> <strong>الصحراء</strong></p> <p dir="rtl" >كشف تقرير الخبير الفرنسي الان كاشيه ان الصحراء العراقية بها مستودع مياه جوفية هائل ينحدر اليها من الهضبة السعودية منذ الاف السنين بفضل صدع ارضي يحجز المياه غرب نهر الفرات. تكفي هذه المياه لتحويل الصحراء الى مزراع خضراء كبرى.<br />التقرير الذي اعده الخبير الفرنسي هو جزء من مشروع استشاري ممول من الامم المتحدة والاتحاد الاوربي لنقل معلومات غاية في الاهمية عن المياه الجوفية للحكومة العراقية بغية استغلالها الامثل.</p> <p dir="rtl">تعارض وزارة الموراد المائية ما جاء بالتقرير لاسباب مجهولة وتقلل من قيمة ما جاء فيه رغم التقييم والرصانة العلمية والعالمية الورادة فيه.</p> <p dir="rtl"><strong>الية</strong> <strong>العمل</strong></p> <p dir="rtl">يتم تشكيل شركة وطنية عراقية بأسم <strong>شركة</strong> <strong>مياه</strong> <strong>الصحراء</strong> تعمل في المرحلة الاولى على التواصل باسم الشعب العراقي مع طرفين :</p> <p dir="rtl">الطرف الاول: هو شركة الخبير الفرنسي نفسه وتمويل فريق يعمل على حفر ابار تجريبة في المنطقة الصحرواية قرب الحدود السعودية والتي جاءت في التقرير، ومن اجل التثبت بشكل عملي من القياسات الاولية.</p> <p dir="rtl">الطرف الثاني: التعاقد مع لجنة استشارية مستقلة من الاتحاد الاوربي من اجل تقييم التقرير وتقديم خطة عمل لاستثمار الخزين المائي الضخم.</p> <p dir="rtl">ويتم بث النتائج النهائية على الهواء مباشرة وفي اجتماع مشترك بين الشركة الفرنسية والفريق الاستشاري.</p> <p dir="rtl"><strong>رأس</strong> <strong>مال</strong> <strong>الشركة</strong></p> <p dir="rtl">يركز بناء الشركة على مشاركة اكبر عدد ممكن من ابناء الشعب العراقي، ولهذا يتكون رأس مال الشركة من 10 ملايين سهم بقيمة 500 دينار للسهم الواحد، ويتم انفاق الامول بالتصويت على تمويل الفريق الاستشاري وبناء محطات استخراج المياه.</p> <p dir="rtl"><strong>الادارة</strong></p> <p dir="rtl">يدير جميع المساهمون الشركة ويتم اتخاذ القرارات بالتصويت.</p> <p dir="rtl"><strong>الارباح</strong></p> <p dir="rtl">تعتمد قيمة الارباح لكل المساهمين على كمية المياه المكتشفة وحجم الاراضي الصحراوية التي يتم استصلاحها. بحسب التقرير الاممي فإن العائد المادي على المستوى الوطني هائل جداً.</p> ';
const ProductDetails = props => {
  const route = useRoute();
  const {product} = route.params;

  const [showVideo, setShowVideo] = useState(false);

  function onVideoChangeState() {}

  function onImagePressed() {
    setShowVideo(true);
  }

  return (
    <View style={styles.container}>
      {showVideo && (
        <View>
          <YoutubePlayer
            height={200}
            play={showVideo}
            videoId={product.videoUrl}
            onChangeState={onVideoChangeState}
          />
        </View>
      )}

      {!showVideo && (
        <CenteredImage
          firstImage={{uri: product.videoThumb}}
          secondImage={require('../../assets/play.png')}
          onImagePressed={setShowVideo}
        />
      )}

      <WebView
        source={{html: product.fullDescription}}
        style={styles.webView}
        startInLoadingState={true}
        scalesPageToFit={true}
        scrollEnabled={true}
      />
    </View>
  );
};

const CenteredImage = ({firstImage, secondImage, onImagePressed}) => {
  function onPress() {
    onImagePressed(true);
  }

  return (
    <View style={styles.containerTwoImage}>
      <TouchableOpacity
        onPress={onPress}
        style={{width: '90%', height: '100%'}}>
        <Image style={{width: '100%', height: '100%'}} source={firstImage} />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={onPress}>
          <Image style={{width: 90, height: 90}} source={secondImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  webView: {
    height: 200,
    minHeight: 10,
    marginVertical: 10,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -24,
    marginLeft: -24,
  },
  centerIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -12}, {translateY: -12}],
  },

  containerTwoImage: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductDetails;
