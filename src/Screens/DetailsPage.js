import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Modal, Pressable, Image, FlatList,  TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { height, width } = Dimensions.get('screen')

const DetailsPage = () => {


  const Data = [
    {
      image: require('../../Image/Email.webp'),
      image: require('../../Image/Email.webp'),
      haed: 'Bonus in 2021',
      trans: '#JHG567DFGH567',
      txt1: '14TH May',
      txt2: 'status',
      txt3: 'In progress',
      txt4: 'Confirmed',
      txt5: 'Amount',
      txt6: '$2.00',
      txt7: 'Account Info',
      txt8: 'Lorem Ipsum',
      txt9: 'Deductions',
      txt10: 'Service',
      txt11: 'TDS',
      txt12: 'IMPS FEE',
      allTxt: 'All'
    }
  ]

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView>
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => { setModalVisible(true) }}>
        <Text style={{fontSize: 30, color: 'red'}}>Open Details</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>

          <FlatList
            data={Data}
            horizontal
            renderItem={({ item }) => (
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.headerModal}>
                  <Pressable style={styles.titleCons}>
                    <Text style={styles.btnTxt}>{item.allTxt}</Text>
                  </Pressable>
                  <TouchableOpacity style={styles.titleCon}>
                    <Text style={styles.btnTxt}>Recent</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.titleCon}>
                    <Text style={styles.btnTxt}>Old</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.titleCon}>
                    <Text style={styles.btnTxt}>Filter</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.modalView}>
                  <View style={styles.bonusCon}>
                    <Text style={styles.bonusTxt}>{item.haed}</Text>
                  </View>

                  <View style={styles.transCon}>
                    <View style={styles.imgCon}>
                      <Image source={require('../../Image/Profile.png')}
                        resizeMode='center'
                        style={styles.imageDesign} />
                    </View>
                    <View>
                      <View style={styles.transaCons}>
                        <Text style={styles.transTxtx}>{item.trans}</Text>
                        <Text style={styles.statusTxt}>status</Text>
                      </View>
                      <View style={styles.transaCon}>
                        <Text style={styles.dateTxt}>14th MAy</Text>
                        <Text style={styles.progressTxt}>In Progesss</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.amountCon}>
                    <View style={styles.leftCon}>
                      <Text style={styles.statusTxt}>Amount</Text>
                      <Text style={styles.valueTxt}>$2.00</Text>
                    </View>
                  </View>

                  <View style={styles.amountCon}>
                    <View style={styles.boderCon}>
                      <Text style={styles.bonusTxt}>Account Info</Text>
                      <View style={styles.singleLine}>
                      </View>
                    </View>
                  </View>

                  <View style={styles.loremCon}>
                    <View style={styles.loremContainer}>
                      <Text style={styles.transTxtx}>Lorem Ipsum</Text>

                    </View>
                  </View>

                  <View style={styles.amountCon}>
                    <View style={styles.boderCon}>
                      <Text style={styles.bonusTxt}>Deductions</Text>
                      <View style={styles.singleLine}>
                      </View>
                    </View>
                  </View>

                  <View style={styles.deductCon}>
                    <View style={styles.deductContainer}>
                      <View style={styles.firstBox}>
                        <Text style={styles.statusTxt}>Service</Text>
                        <Text style={styles.valueTxt}>$2.00</Text>
                      </View>
                      <View style={styles.boxCreate}>
                        <Text style={styles.statusTxt}>TDS</Text>
                        <Text style={styles.valueTxt}>$2.00</Text>
                      </View>
                      <View style={styles.lastBox}>
                        <Text style={styles.statusTxt}>IMPS FEE</Text>
                        <Text style={styles.valueTxt}>$2.00</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.bonusCon}>
                    <Text style={styles.bonusTxt}>{item.haed}</Text>
                  </View>

                  <View style={styles.transCon}>
                    <View style={styles.imgCon}>
                      <Image source={require('../../Image/Profile.png')}
                        resizeMode='center'
                        style={styles.imageDesign} />
                    </View>
                    <View>
                      <View style={styles.transaCons}>
                        <Text style={styles.transTxtx}>{item.trans}</Text>
                        <Text style={styles.statusTxt}>status</Text>
                      </View>
                      <View style={styles.transaCon}>
                        <Text style={styles.dateTxt}>14th MAy</Text>
                        <Text style={styles.confirmedTxt}>Confirmed</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.amountCon}>
                    <View style={styles.leftCon}>
                      <Text style={styles.statusTxt}>Amount</Text>
                      <Text style={styles.valueTxt}>$2.00</Text>
                    </View>
                  </View>

                  <View style={styles.amountCon}>
                    <View style={styles.boderCon}>
                      <Text style={styles.bonusTxt}>Account Info</Text>
                      <View style={styles.singleLine}>
                      </View>
                    </View>
                  </View>

                  <View style={styles.loremCon}>
                    <View style={styles.loremContainer}>
                      <Text style={styles.transTxtx}>Lorem Ipsum</Text>

                    </View>
                  </View>

                  <View style={styles.amountCon}>
                    <View style={styles.boderCon}>
                      <Text style={styles.bonusTxt}>Deductions</Text>
                      <View style={styles.singleLine}>
                      </View>
                    </View>
                  </View>

                  <View style={styles.deductCon}>
                    <View style={styles.deductContainer}>
                      <View style={styles.firstBox}>
                        <Text style={styles.statusTxt}>Service</Text>
                        <Text style={styles.valueTxt}>$2.00</Text>
                      </View>
                      <View style={styles.boxCreate}>
                        <Text style={styles.statusTxt}>TDS</Text>
                        <Text style={styles.valueTxt}>$2.00</Text>
                      </View>
                      <View style={styles.lastBox}>
                        <Text style={styles.statusTxt}>IMPS FEE</Text>
                        <Text style={styles.valueTxt}>$2.00</Text>
                      </View>
                    </View>
                  </View>



                </View>

              </Pressable>
            )}
          />
        </View>
      </Modal>
    </View>
    </SafeAreaView>
  )
}

export default DetailsPage

const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  centeredView: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#595959',
    justifyContent: 'center',
    alignItems: 'center'


  },
  headerModal: {
    height: height / 10,
    width: width / 1,
    // backgroundColor: 'blue',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleCon: {
    height: height / 25,
    width: width / 6,
    backgroundColor: '#959595',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleCons: {
    height: height / 25,
    width: width / 6,
    backgroundColor: '#4F4F4F',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    height: height / 1.1,
    width: width / 1.05,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignSelf: 'center'

  },

  btnTxt: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  bonusCon: {
    height: height / 15,
    width: width / 1.1,
    // backgroundColor: 'pink',
    alignSelf: 'center',
    borderBottomWidth: 2,
    borderColor: '#DCDCDC',
    justifyContent: 'center'
  },
  bonusTxt: {
    fontWeight: '700',
    color: '#959595',
    fontSize: height / 60
  },
  transCon: {
    height: height / 13,
    width: width / 1.15,
    // backgroundColor: 'pink',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',

  },
  imgCon: {
    height: height / 15,
    width: width / 10,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageDesign: {
    height: height / 25,
    width: width / 18,
  },
  transaCon: {
    height: height / 30,
    width: width / 1.3,
    // backgroundColor: 'cyan',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center'
  },
  transaCons: {
    height: height / 20,
    width: width / 1.3,
    // backgroundColor: 'cyan',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  transTxtx: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: height / 50
  },
  statusTxt: {
    color: '#808080',
    fontWeight: '700',
    fontSize: height / 80
  },
  dateTxt: {
    color: '#808080',
    fontWeight: 'bold',
    fontSize: height / 68
  },
  progressTxt: {
    color: '#FFA500',
    fontWeight: 'bold',
    fontSize: height / 65
  },
  confirmedTxt: {
    color: '#00ff00',
    fontWeight: 'bold',
    fontSize: height / 65
  },
  amountCon: {
    height: height / 25,
    width: width / 1.15,
    // backgroundColor: 'cyan',
    alignSelf: 'center',
    alignItems: 'flex-end',

  },
  leftCon: {
    height: height / 20,
    width: width / 1.3,
    // backgroundColor: 'pink',
    justifyContent: 'center'
  },
  valueTxt: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: height / 55
  },
  boderCon: {
    height: height / 20,
    width: width / 1.3,
    // backgroundColor: 'pink',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  singleLine: {
    height: 1,
    width: width / 1.9,
    backgroundColor: '#808080'
  },
  loremCon: {
    height: height / 30,
    width: width / 1.15,
    // backgroundColor: 'pink',
    alignSelf: 'center',
    alignItems: 'flex-end',

  },
  loremContainer: {
    height: height / 30,
    width: width / 1.3,
    // backgroundColor: 'cyan',
  },
  deductCon: {
    height: height / 15,
    width: width / 1.15,
    // backgroundColor: 'cyan',
    alignSelf: 'center',
    alignItems: 'flex-end',
    borderBottomWidth: 0.5
  },
  deductContainer: {
    height: height / 17,
    width: width / 1.3,
    // backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  boxCreate: {
    height: height / 25,
    width: width / 4,
    // backgroundColor: 'red',
    borderRightWidth: 1,
    borderColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center'
  },
  firstBox: {
    height: height / 25,
    width: width / 5,
    // backgroundColor: 'red',
    borderRightWidth: 1,
    borderColor: '#808080',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  lastBox: {

    height: height / 25,
    width: width / 4,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'

  }

})