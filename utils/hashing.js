import bcrypt from 'bcrypt'

class krypto {
    encrypt(password) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        return [hashPassword, salt]
    }
    decrypt(password, salt) {
        return bcrypt.hashSync(password, salt)
    }
}

const kryptoService = new krypto();
export default kryptoService