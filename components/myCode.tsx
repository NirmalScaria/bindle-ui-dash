"use client";
import { atomOneLight, CopyBlock } from "react-code-blocks";
export default function MyCode({ code, highlight, showLineNumbers = true, language = "jsx", customStyle }: { code: string, highlight?: string, showLineNumbers?: boolean, language?: string, customStyle?: Record<string, string> }) {

    return <CopyBlock
        highlight={highlight}
        text={code}
        language={language}
        showLineNumbers={showLineNumbers}
        theme={atomOneLight}
        customStyle={{ width: "100%", padding: "10px", border: "1px solid #00000020", borderRadius: '8px', zIndex: "1", overflow: 'auto', ...customStyle }}
    />
}