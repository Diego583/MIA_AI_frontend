import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

const wordsList = [
  "pretty nerdy goth blonde brunette short tall slim curvy shy outgoing otaku anime cartoon goth cosplay sweet gamer funny streamer quirky innocent",
  "pretty nerdy goth blonde brunette short tall slim curvy shy outgoing otaku anime cartoon goth cosplay sweet gamer funny streamer quirky innocent",
  "pretty nerdy goth blonde brunette short tall slim curvy shy outgoing otaku anime cartoon goth cosplay sweet gamer funny streamer quirky innocent",
  "pretty nerdy goth blonde brunette short tall slim curvy shy outgoing otaku anime cartoon goth cosplay sweet gamer funny streamer quirky innocent",
];

const getWords = (i: number) => {
  return wordsList[i % wordsList.length]
    .replace(/[!.,:;?]/g, "")
    .split(" ")
    .map((word) => ({ text: word, size: 10 + Math.random() * 60 }));
};

const WordCloud: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 400;
    const fill = d3.scaleOrdinal<string>()
      .range(["#ff00ff", "#ff66ff", "#ff99ff", 
              "#ffccff", "#fcb6d0", "#ff80b3", 
              "#ff33cc", "#ff0080", "#ff0055", "#e60073"]);

    // Remove previous SVG if exists
    d3.select(containerRef.current).select("svg").remove();

    const svg = d3
      .select(containerRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const draw = (words: { text: string; size: number; x?: number; y?: number; rotate?: number }[]) => {
      const cloud = svg.selectAll<SVGTextElement, { text: string; size: number; x?: number; y?: number; rotate?: number }>("text").data(words, (d: any) => d.text);

      cloud.enter()
        .append("text")
        .style("font-family", "Impact")
        .style("fill", (_: any, i: any) => fill(i.toString()))
        .attr("text-anchor", "middle")
        .attr("font-size", 1)
        .text((d: any) => d.text)
        .merge(cloud as any)
        .transition()
        .duration(600)
        .style("font-size", (d: any) => `${d.size}px`)
        .attr("transform", (d: any) => `translate(${d.x}, ${d.y})rotate(${d.rotate})`)
        .style("fill-opacity", 1);

      cloud.exit()
        .transition()
        .duration(200)
        .style("fill-opacity", 1e-6)
        .attr("font-size", 1)
        .remove();
    };

    const layout = cloud()
      .size([width, height])
      .words(getWords(index))
      .padding(5)
      .rotate(() => Math.random() > 0.5 ? 90 : 0)
      .font("Impact")
      .fontSize((d: any) => d.size)
      .on("end", draw);

    layout.start();

    const timeout = setTimeout(() => {
      setIndex((prevIndex) => prevIndex + 1);
    }, 2000);

    return () => {
      clearTimeout(timeout);
      svg.remove();
    };
  }, [index]);

  return <div ref={containerRef} style={{ width: "100%", height: "400px", padding: "20px" }} />;
};

export default WordCloud;
