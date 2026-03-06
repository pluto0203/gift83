/**
 * =============================================================
 *  🌸 MESSAGES.JS — CHỈ BẠN CẦN CHỈNH SỬA FILE NÀY
 * =============================================================
 *
 *  Mỗi người nhận sẽ có một "key" (từ khoá trong link).
 *
 *  Ví dụ:
 *    key: "me"     →  link: https://your-site.vercel.app/?to=me
 *    key: "chi"    →  link: https://your-site.vercel.app/?to=chi
 *
 *  Các trường:
 *    name      — Tên người nhận (hiển thị trên thiệp)
 *    relation  — Mối quan hệ   (Mẹ yêu / Chị thân / ...)
 *    emoji     — Emoji đại diện
 *    message   — NỘI DUNG LỜI CHÚC (có thể nhiều đoạn, dùng \n\n)
 *    signature — Chữ ký của bạn ở cuối thiệp
 *    color     — Màu nhấn: "pink" | "purple" | "red" | "gold"
 * =============================================================
 */

const MESSAGES = {

    // ── Ví dụ 1: Mẹ ──────────────────────────────────────────
    "me": {
        name: "Mẹ",
        relation: "Người mẹ tuyệt vời nhất",
        emoji: "👩‍👧‍👦",
        message: `Con muốn Mẹ biết rằng mọi thứ con có được hôm nay đều bắt đầu từ đôi tay và tấm lòng của Mẹ.

Cảm ơn Mẹ vì những buổi sáng sớm thức dậy lo cho con, những lời động viên khi con nản lòng, và nụ cười của Mẹ — thứ luôn khiến con cảm thấy mọi chuyện đều ổn.

Chúc Mẹ ngày 8/3 thật vui, thật khoẻ, và luôn biết rằng con yêu Mẹ rất nhiều! 🌹`,
        signature: "Con của Mẹ ❤️",
        color: "red",
    },

    // ── Ví dụ 2: Chị / Em gái ────────────────────────────────
    "chi": {
        name: "Chị Lan",
        relation: "Người chị thân yêu",
        emoji: "🌸",
        message: `Chị ơi, em biết chị lúc nào cũng bận rộn và cố gắng hết mình.

Nhân ngày 8/3, em chỉ muốn nói: chị là người phụ nữ mạnh mẽ và đáng ngưỡng mộ nhất mà em biết. Chúc chị luôn tươi như hoa, rực rỡ như nắng!`,
        signature: "Em yêu chị nhiều lắm 🌷",
        color: "pink",
    },

    // ── Ví dụ 3: Bạn thân ────────────────────────────────────
    "ban": {
        name: "Hương",
        relation: "Người bạn thân nhất",
        emoji: "💜",
        message: `Tặng đứa bạn thân nhất đã cùng mình đi qua bao nhiêu chuyện — vui có, khóc có, ăn thì... nhiều nhất 😄

Chúc mày ngày 8/3 được chiều hết mức, nhận đủ hoa và quà, và quan trọng nhất — luôn yêu thương bản thân nhiều hơn mỗi ngày!`,
        signature: "Mày biết tao là ai rồi đó 😂",
        color: "purple",
    },

    // ── Ví dụ 4: Bà / Bà ngoại ──────────────────────────────
    "ba": {
        name: "Bà",
        relation: "Bà Ngoại yêu quý",
        emoji: "🌻",
        message: `Cháu kính chúc Bà ngày Quốc tế Phụ nữ 8/3 thật vui vẻ và bình an.

Bà là người phụ nữ cháu kính trọng nhất — cả một đời tần tảo, yêu thương mọi người mà không đòi hỏi gì. Cháu yêu Bà rất nhiều!`,
        signature: "Cháu yêu Bà 🌻",
        color: "gold",
    },

};

// Thiệp mặc định nếu không có ?to= trong link
const DEFAULT_KEY = "me";
