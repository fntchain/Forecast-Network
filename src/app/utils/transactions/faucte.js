import { BigNum } from '@liskhq/bignum'
import { getAddressFromPublicKey } from '@liskhq/lisk-cryptography'
import { BaseTransaction, TransactionError } from '@liskhq/lisk-transactions'
class FaucetTransaction extends BaseTransaction {
  static get TYPE() {
    return 101
  }
  static get FEE() {
    return `0`
  }

  async prepare(store) {
    await store.account.cache([
      { address: this.senderId },
      { username: this.asset.data },
    ])
  }

  validateAsset() {
    const errors = []

    if (!this.senderId) {
      errors.push(
        new TransactionError(
          '`senderId` must be provided.',
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
    const balance = new BigNum(sender.balance)
    if (balance.gt(1000000000)) {
      errors.push(
        new TransactionError(
          'sender balance to high',
          this.id,
          '.amount',
          sender.balance
        )
      )
    }
    if (this.asset.data && !sender.username) {
      const usernameExists = store.account.find(
        (account) =>
          account.username === this.asset.data &&
          account.address !== this.senderId
      )

      if (usernameExists) {
        errors.push(
          new TransactionError(
            `Username is not unique.`,
            this.id,
            '.asset.username'
          )
        )
      }
      store.account.set(this.senderId, {
        ...sender,
        username: this.asset.data,
        isDelegate: 1,
        asset: { pic: this.asset.pic },
        balance: new BigNum(10000000000).toString(),
      })
    } else {
      store.account.set(this.senderId, {
        ...sender,
        asset: { pic: this.asset.pic },
        balance: new BigNum(10000000000).toString(),
      })
    }

    return errors
  }

  undoAsset(store) {
    const errors = []
    const sender = store.account.getOrDefault(this.senderId)
    const balance = new BigNum(sender.balance)
    if (balance.lt(10000000000)) {
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
      asset: null,
      balance: new BigNum(balance.toString()).sub(10000000000).toString(),
    })

    return errors
  }
}
export default FaucetTransaction
