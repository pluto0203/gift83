/**
 * =============================================================
 *  🌸 MESSAGES.JS — Chỉ cần chỉnh file này để thêm người nhận
 * =============================================================
 *
 *  Mỗi người nhận một "key" — dùng làm link gửi cho họ:
 *  Link: https://your-site.vercel.app/?to=KEY
 *
 *  Các trường:
 *    name       — Tên hiển thị trên thiệp
 *    relation   — Mối quan hệ (tuỳ bạn đặt)
 *    emoji      — Emoji đại diện
 *    message    — Nội dung lời chúc (xuống dòng dùng \n\n)
 *    signature  — Chữ ký của bạn ở cuối
 *    color      — "pink" | "purple" | "red" | "gold" | "rose" | "sky"
 *    luckyMoney — (Tuỳ chọn) Số tiền/Quà tặng hiện sau lớp thẻ cào
 * =============================================================
 */

const MESSAGES = {

    // ── Ví dụ: Mẹ ────────────────────────────────────────────
    // Link gửi Mẹ: https://your-site.vercel.app/?to=me
    "me": {
        name: "Mẹ",
        relation: "Người mẹ tuyệt vời nhất",
        emoji: "🌹",
        message:
            `Con muốn Mẹ biết rằng mọi thứ con có được hôm nay đều bắt đầu từ đôi tay và tấm lòng của Mẹ.

Cảm ơn Mẹ vì những buổi sáng sớm lo cho con, những lời động viên khi con nản lòng, và nụ cười của Mẹ — thứ luôn khiến con thấy mọi chuyện đều ổn.

Chúc Mẹ ngày 8/3 thật vui, thật khoẻ! Con yêu Mẹ rất nhiều 🌹`,
        signature: "Con của Mẹ ❤️",
        color: "red",
        luckyMoney: "300.000 VNĐ",
    },

    "v2": {
        name: "Thúy Vi",
        relation: "International Women's Day",
        emoji: "🌹",
        message:
            `Nhân dịp 8/3, chúc bạn Thúy Vi ngày một xinh đẹp, dễ thương, ngày càng có thêm nhiều chàng trai theo đuổi như lửa bám xăng, như răng bám lợi. 😆

Cảm ơn vì đã dành thời gian update drama cũng như kể các câu chuyện thú vị, giúp tui có thêm nhiều niềm vui. Hy vọng bạn làm tốt trong kỳ thi sắp tới và đạt được đúng nguyện vọng mong muốn nhé.

All best wishes for you, keep shining and smiling always 🌹`,
        signature: "Thanh Duy",
        color: "rose",
    },

    "k1": {
        name: "Thiên Kim",
        relation: "International Women's Day",
        emoji: "🌹",
        message:
            `Nhân dịp 8/3, chúc bạn Thiên Kim nhan sắc quyết liệt thăng hoa, tiền vô ào ào, tình yêu tưng bừng bùng nổ. 😆

Cảm ơn vì đã dành thời gian update drama cũng như kể các câu chuyện thú vị, giúp tui có thêm nhiều niềm vui. Cố gắng chăm chỉ, nỗ lực theo đuổi ước mơ của mình nhé!

All best wishes for you, keep shining and smiling always 🌹`,
        signature: "Thanh Duy",
        color: "sky",
    },

    "x1": {
        name: "Khả Kỳ",
        relation: "International Women's Day",
        emoji: "🌸",
        message:
            `Hôm nay là một ngày đặc biệt của các bạn nữ. Anh gửi em lời chúc tốt lành và may mắn nhất 😆

Chúc em luôn rạng ngời, xinh đẹp, hạnh phúc và bình an. Cố gắng chăm chỉ, nỗ lực theo đuổi ước mơ của mình nhé!

All best wishes for you, keep shining and smiling always 🌹`,
        signature: "Thanh Duy",
        color: "sky",
        luckyMoney: "32.857 VNĐ",
    },

    "t11": {
        name: "Minh Thư",
        relation: "International Women's Day",
        emoji: "🌸",
        message:
            `Hôm nay là một ngày đặc biệt của các bạn nữ. Gửi bạn tui những lời chúc tốt lành và may mắn nhất 😆

Chúc bạn tui luôn rạng ngời, xinh đẹp, hạnh phúc và bình an. Cố gắng chăm chỉ, nỗ lực theo đuổi ước mơ lấy chồng giàu của mình nhé!

All best wishes for you, keep shining and smiling always 🌹`,
        signature: "Thanh Duy",
        color: "rose",
        luckyMoney: "37.086 VNĐ",
    },

    // ── Thêm người tiếp theo vào đây (copy block phía trên) ──
    // "ten": {
    //   name:       "...",
    //   relation:   "...",
    //   emoji:      "🌸",
    //   message:    `...`,
    //   signature:  "...",
    //   color:      "pink",
    //   luckyMoney: "100k Momo",
    // },

};

// Thiệp mặc định nếu vào link không có ?to=
const DEFAULT_KEY = "me";
