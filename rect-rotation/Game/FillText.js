export default class FillText {
    constructor(_ = {
        x: 0,
        y: 0,
        text: "undefined",
        fontSize: 0,
        color: "black",
        fontFamily: "monospace"
    }) {
        this.fontFamily = _.fontFamily;
        this.color = _.color;
        this.fontSize = _.fontSize;
        this.pos = {};
        this.pos.x = _.x;
        this.pos.y = _.y;
        this.text = _.text;
    }

    draw(_) {
        _.font = this.fontSize + "px normal " + this.fontFamily;
        _.fillStyle = this.color;
        _.fillText(this.text, this.pos.x, this.pos.y);
    }

    setPos(_x, _y) {
        this.pos.x = _x;
        this.pos.y = _y;
    }
}