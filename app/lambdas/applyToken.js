// 람다식은 일회성으로 작용
// 람다식은 순수함수로 작성되어야한다 (함수안의 함수)
// apply : 파라미터 o, 리턴 o
const applyToken = headers => {
    if (headers && headers.authorization) {
        let parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null
        }
    } else {
        return null
    }
}

// apply인 경우 export해준다
export default applyToken