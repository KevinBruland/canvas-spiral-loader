function draw() {
    var canvas = document.getElementById("canvas");
    canvas.height = 500;
    canvas.width = 500;
    var hh = canvas.height / 2;
    var hw = canvas.width / 2;
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineCap = "round";

        var mods = {
            maxSize: 250,
            lineM: 30,
            relativeSpeed: 1,
            fillColor: "rgba(0,0,0,.2)",
            arcColor: "rgb(0,255,255)",
            arcColor2: "rgb(0,120,205)"
        };

        ctx.fillStyle = mods.fillColor;

        var arcs = [];
        var arcs2 = [];

        function ArcCreator(size, start, end) {
            this.size = size;
            this.start = start;
            this.end = end;
        }

        //Create Initial Arcs
        function initArcs() {
            for (var i = mods.lineM; i < mods.maxSize; i += mods.lineM) {
                var arcTemp = new ArcCreator(mods.maxSize - i, Math.PI * (.5 + .05 * (i / mods.lineM)), Math.PI * (1.5 - .05 * (i / mods.lineM)));
                arcs.push(arcTemp);
            };
            for (var i = mods.lineM; i < mods.maxSize - mods.lineM / 2; i += mods.lineM) {
                var arcTemp = new ArcCreator((mods.maxSize - mods.lineM / 2) - i, Math.PI * (1.5 + .05 * (i / mods.lineM)), Math.PI * (2.5 - .05 * (i / mods.lineM)));
                arcs2.push(arcTemp);
            };
            ctx.lineWidth = mods.lineM / 4;
            animateArcs();
        }
        initArcs();

        //Draw the arcs
        function drawArcs(arr, color) {
            ctx.strokeStyle = color;
            for (var i = 0; i < arr.length; i++) {
                ctx.beginPath();
                ctx.arc(hw, hh, arr[i].size, arr[i].start, arr[i].end);
                ctx.stroke();
                arr[i].start += (arr[i].size / 2000) * mods.relativeSpeed;
                arr[i].end += (arr[i].size / 2000) * mods.relativeSpeed;
            }
        }

        //Animate
        function animateArcs() {
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawArcs(arcs, mods.arcColor);
            drawArcs(arcs2, mods.arcColor2);
            requestAnimationFrame(animateArcs);
        }
    }
}

draw();
