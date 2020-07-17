import { BigNum } from '@liskhq/bignum'
import { getAddressFromPublicKey } from '@liskhq/lisk-cryptography'
import { BaseTransaction, TransactionError } from '@liskhq/lisk-transactions'

class GuessBetTransaction extends BaseTransaction {
  static get TYPE() {
    return 102
  }
  static get FEE() {
    return `0`
  }

  async prepare(store) {
    await store.account.cache([{ address: this.senderId }])
  }

  validateAsset() {
    const errors = []
    const amount = new BigNum(this.asset.amount)
    if (amount.lt(100000000)) {
      errors.push(
        new TransactionError(
          'Amount must be at least 1 to bet',
          this.id,
          '.amount',
          this.asset.amount.toString(),
          '0'
        )
      )
    }

    if (!this.senderId) {
      errors.push(
        new TransactionError(
          '`rsenderId` must be provided.',
          this.id,
          '.senderId'
        )
      )
    }
    if (this.senderPublicKey) {
      const calculatedAddress = getAddressFromPublicKey(this.senderPublicKey)
      if (this.senderId !== calculatedAddress) {
        errors.push(
          new TransactionError(
            'senderId does not match senderPublicKey.',
            this.id,
            '.senderId',
            this.senderId,
            calculatedAddress
          )
        )
      }
    }

    return errors
  }

  applyAsset(store) {
    const errors = []
    const sender = store.account.getOrDefault(this.senderId)
    console.log(sender)
    const balance = new BigNum(sender.balance)
    if (balance.lt(this.asset.amount)) {
      errors.push(
        new TransactionError(
          'sender balance to low',
          this.id,
          '.amount',
          sender.balance
        )
      )
    }
    store.account.set(this.senderId, {
      ...sender,
      balance: balance.sub(this.asset.amount).toString(),
    })

    return errors
  }

  undoAsset(store) {
    const errors = []
    const sender = store.account.getOrDefault(this.senderId)
    const balance = new BigNum(sender.balance)

    store.account.set(this.senderId, {
      ...sender,
      balance: balance.add(this.asset.amount).toString(),
    })

    return errors
  }
}
export default GuessBetTransaction
