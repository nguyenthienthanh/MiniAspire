import React, { FC, useCallback, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native'
import Container from '../components/Container'
import { useTheme } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  AspireLogo,
  VisaLogo,
  TopUpIcon,
  SpendingIcon,
  FreezeIcon,
  NewCardIcon,
  DeactivatedIcon,
} from '../assets/icons'
import { SvgProps } from 'react-native-svg'

export type DebitCardScreenProps = {}

const menuItems: MenuItemProps[] = [
  {
    title: 'Top-up account',
    subtitle: 'Deposit money to your account to use with card',
    icon: TopUpIcon,
  },
  {
    title: 'Weekly spending limit',
    subtitle: 'You haven’t set any spending limit on card',
    icon: SpendingIcon,
    rightActions: (
      <Switch style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }} />
    ),
  },
  {
    title: 'Freeze card',
    subtitle: 'Your debit card is currently active',
    icon: FreezeIcon,
    rightActions: (
      <Switch
        style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
        value={true}
      />
    ),
  },
  {
    title: 'Deactivate and get new card',
    subtitle: 'This deactives your current debit card',
    icon: NewCardIcon,
  },
  {
    title: 'Deactivated cards',
    subtitle: 'Your previously deactivated cards',
    icon: DeactivatedIcon,
  },
]

const DebitCardScreen: FC<DebitCardScreenProps> = (props) => {
  const { colors } = useTheme() as any

  const [showCardDetail, setShowCardDetail] = useState(false)
  const handleToggleShowCardDetail = useCallback(
    () => setShowCardDetail(!showCardDetail),
    [showCardDetail],
  )

  return (
    <Container
      variant="secondary"
      barStyle="light-content"
      title="Debit Card"
      subtitle={
        <>
          <Text style={styles.availableBalanceText}>Available balance</Text>

          <View style={styles.availableBalanceDetailContainer}>
            <View
              style={[
                styles.availableBalanceDetailTitleContainer,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text style={styles.availableBalanceDetailTitle}>S$</Text>
            </View>

            <Text style={styles.availableBalanceDetailValue}>3,000</Text>
          </View>
        </>
      }
    >
      <View style={styles.debitCardContainer}>
        <TouchableOpacity
          style={styles.showCardButton}
          onPress={handleToggleShowCardDetail}
        >
          <MaterialCommunityIcons
            name={showCardDetail ? 'eye-off' : 'eye'}
            size={16}
            color={colors.primary}
            style={styles.showCardButtonIcon}
          />

          <Text style={[{ color: colors.primary }, styles.showCardButtonTitle]}>
            {showCardDetail ? 'Hide card number' : 'Show card number'}
          </Text>
        </TouchableOpacity>

        <View style={[styles.debitCard, { backgroundColor: colors.primary }]}>
          <AspireLogo style={{ alignSelf: 'flex-end' }} />

          <Text style={styles.debitCardName}>Mark Henry</Text>

          <View style={styles.debitCardNumber}>
            {[5647, 3411, 2413, 2020].map((cardNumber, index) => (
              <CardNumberItem
                key={index}
                value={cardNumber}
                hidden={showCardDetail ? false : index < 3 && true}
              />
            ))}
          </View>

          <View style={styles.debitCardSecurityDetail}>
            <Text style={[styles.debitCardSecurityText, { marginRight: 30 }]}>
              Thru: 12/20
            </Text>

            <Text style={styles.debitCardSecurityText}>{`CVV: `}</Text>
            <Text
              style={[
                styles.debitCardSecurityText,
                showCardDetail
                  ? {}
                  : {
                      marginTop: 4,
                      fontSize: 24,
                    },
              ]}
            >
              {showCardDetail ? 456 : '***'}
            </Text>
          </View>

          <VisaLogo style={styles.debitCardLogo} />
        </View>
      </View>

      <View style={styles.menuList}>
        {menuItems.map((item, index) => {
          return (
            <MenuItem
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              rightActions={item.rightActions}
            />
          )
        })}
      </View>
    </Container>
  )
}

type CardNumberItemProps = {
  hidden?: boolean
  value: number
}

const CardNumberItem: FC<CardNumberItemProps> = (props) => {
  return (
    <Text style={styles.debitCardNumberItem}>
      {props.hidden ? '●●●●' : props.value}
    </Text>
  )
}

type MenuItemProps = {
  icon: React.FC<SvgProps>
  title: string
  subtitle: string
  rightActions?: any
}

const MenuItem: FC<MenuItemProps> = (props) => {
  return (
    <View style={styles.menuItemContainer}>
      <props.icon width={32} height={32} style={{ flex: 2 }} />

      <View style={styles.menuItemText}>
        <Text style={styles.menuItemTitle}>{props.title}</Text>
        <Text style={styles.menuItemSubtitle}>{props.subtitle}</Text>
      </View>

      {props.rightActions && (
        <View style={styles.menuItemRightActions}>{props.rightActions}</View>
      )}
    </View>
  )
}

export default DebitCardScreen

const styles = StyleSheet.create({
  availableBalanceText: {
    paddingTop: 24,
    color: '#fff',
    fontFamily: 'AvenirNext-Medium',
    fontSize: 14,
  },
  availableBalanceDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  availableBalanceDetailTitleContainer: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'center',
  },
  availableBalanceDetailTitle: {
    fontSize: 13,
    fontFamily: 'AvenirNext-Bold',
    color: '#fff',
  },
  availableBalanceDetailValue: {
    paddingLeft: 10,
    fontSize: 24,
    fontFamily: 'AvenirNext-Bold',
    color: '#fff',
  },
  debitCardContainer: {
    marginTop: -120,
    zIndex: 100,
  },
  debitCard: {
    borderRadius: 16,
    padding: 24,
  },
  showCardButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    width: 160,
    flexDirection: 'row',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 50,
    marginBottom: -20,
    backgroundColor: '#fff',
  },
  showCardButtonIcon: {
    transform: [{ rotateY: '180deg' }],
  },
  showCardButtonTitle: {
    marginLeft: 10,
    fontSize: 12,
    fontFamily: 'AvenirNext-DemiBold',
  },
  debitCardName: {
    color: '#fff',
    marginTop: 24,
    letterSpacing: 0.53,
    fontSize: 22,
    fontFamily: 'AvenirNext-Bold',
  },
  debitCardNumber: {
    flexDirection: 'row',
    marginRight: 50,
    marginTop: 24,
    justifyContent: 'space-between',
  },
  debitCardNumberItem: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    letterSpacing: 3.46,
    fontFamily: 'AvenirNext-DemiBold',
  },
  debitCardSecurityDetail: {
    flexDirection: 'row',
    height: 33,
    marginRight: 50,
    marginTop: 18,
  },
  debitCardSecurityText: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 33,
    letterSpacing: 1.56,
    fontFamily: 'AvenirNext-DemiBold',
  },
  debitCardLogo: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  menuList: {
    paddingTop: 16,
  },
  menuItemContainer: {
    flexDirection: 'row',
    paddingVertical: 4,
    marginVertical: 16,
  },
  menuItemText: {
    flex: 3,
    marginLeft: 12,
  },
  menuItemRightActions: {
    flex: 0,
  },
  menuItemTitle: {
    color: '#25345F',
    fontSize: 15,
    fontFamily: 'AvenirNext-Medium',
  },
  menuItemSubtitle: {
    color: '#222222',
    fontSize: 13,
    fontFamily: 'AvenirNext-Regular',
  },
})
