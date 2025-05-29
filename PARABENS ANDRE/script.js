window.onload = function() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confettiParticles = [];
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink', 'cyan', 'magenta'];
    const confettiCount = 200; // Número de confetes na tela

    class ConfettiParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height; // Começa acima da tela
            this.size = Math.random() * 10 + 5; // Tamanho entre 5px e 15px
            this.speed = Math.random() * 3 + 1; // Velocidade de queda entre 1 e 4
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 2 - 1; // Pode girar para ambos os lados
        }

        update() {
            this.y += this.speed;
            this.rotation += this.rotationSpeed;
            if (this.y > canvas.height) {
                // Reinicia o confete no topo quando sai da tela
                this.y = -this.size; // Começa um pouco acima para não aparecer de repente
                this.x = Math.random() * canvas.width;
                this.speed = Math.random() * 3 + 1;
            }
        }

        draw() {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 2); // Formato retangular para confete
            ctx.restore();
        }
    }

    function initConfetti() {
        confettiParticles = [];
        for (let i = 0; i < confettiCount; i++) {
            confettiParticles.push(new ConfettiParticle());
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let particle of confettiParticles) {
            particle.update();
            particle.draw();
        }
        requestAnimationFrame(animateConfetti);
    }

    // Ajustar o canvas se a janela for redimensionada
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initConfetti(); // Reinicia os confetes para a nova dimensão
    });

    // Tentar tocar o áudio (alguns navegadores podem bloquear autoplay)
    const audio = document.getElementById('vuvuzela-sound');
    audio.play().catch(error => {
        console.log("Autoplay do áudio foi bloqueado pelo navegador. Interação do usuário pode ser necessária.", error);
        // Adicionar um botão ou evento de clique para iniciar o áudio se o autoplay falhar
        // document.body.addEventListener('click', () => audio.play(), { once: true });
    });


    initConfetti();
    animateConfetti();
};