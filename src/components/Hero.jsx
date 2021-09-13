import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import state from "./state";
import { Section } from "./Section";
import "./style.scss";

const HTMLContent = ({ domContent, children, bgColor, position }) => {
  const [refItem, inView] = useInView({
    threshold: 0,
  });
  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]}>
        <Html portal={domContent} fullscreen>
          <div ref={refItem} className="container-hero">
            <h1 className="title">{children}</h1>
          </div>
        </Html>
      </group>
    </Section>
  );
};

const Hero = () => {
  let app = useRef(null);
  const [events, setEvents] = useState();
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => {
    void onScroll({ target: scrollArea.current });
    gsap.fromTo(".background", { opacity: 0 }, { opacity: 1, duration: 2 });
  }, []);
  return (
    <div className="background" ref={(el) => (app = el)}>
      <Canvas
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}
        style={{ height: "100vh" }}
      >
        <Suspense fallback={null}>
          <HTMLContent domContent={domContent} bgColor="#fff" position={250}>
            <span>La imagen</span>
            <span>lo es todo </span>
          </HTMLContent>
          <HTMLContent domContent={domContent} bgColor="#b08eee" position={0}>
            <span>Producimos</span>
            <span>contenido de calidad</span>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            bgColor="#8eeeb0"
            position={-250}
          >
            <span>Nos ocupamos</span>
            <span>de todo el</span>
            <span>proceso</span>
          </HTMLContent>
        </Suspense>
      </Canvas>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          overflow: "auto",
        }}
        ref={scrollArea}
        onScroll={onScroll}
        {...events}
      >
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.sections * 100}vh` }} />
      </div>
    </div>
  );
};

export default Hero;
