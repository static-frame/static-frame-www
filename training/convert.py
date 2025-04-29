from markitdown import MarkItDown
import argparse
import os
from pathlib import Path
import shutil
import re


def fix_links(text: str) -> str:
    """Replace .html links with .md links."""
    # This regex finds .html extensions in links like (...).html or (...).html#...
    return re.sub(r'(\.html)([^\w]|$)', r'.md\2', text)

def convert_directory(input_dir: Path, output_dir: Path):
    input_dir = input_dir.resolve()
    output_dir = output_dir.resolve()
    # Clear output directory if it already exists
    # if output_dir.exists():
    #     shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    md = MarkItDown()

    for root, dirs, files in os.walk(input_dir):
        dirs[:] = [d for d in dirs if d != "_modules"]

        for file in files:
            input_fp = Path(root) / file
            if file.endswith(".html"):
                print(f"procesing: {input_fp}")
                relative_path = input_fp.relative_to(input_dir)

                # Change extension from .html -> .md
                output_fp = output_dir / relative_path.with_suffix(".md")
                output_fp.parent.mkdir(parents=True, exist_ok=True)

                result = md.convert(str(input_fp))
                fixed_text = fix_links(result.text_content)
                output_fp.write_text(fixed_text, encoding="utf-8")

            else:
                print(f"skipping: {input_fp}")

def main():
    parser = argparse.ArgumentParser(description="Convert Sphinx HTML directory to Markdown.")
    parser.add_argument("--input", "-i", type=str, required=True, help="Path to input HTML directory")
    parser.add_argument("--output", "-o", type=str, required=True, help="Path to output Markdown directory")

    args = parser.parse_args()

    input_dir = Path(args.input)
    output_dir = Path(args.output)

    if not input_dir.is_dir():
        raise ValueError(f"Input directory {input_dir} does not exist or is not a directory.")

    convert_directory(input_dir, output_dir)

if __name__ == "__main__":
    main()

# if __name__ == "__main__":
#     # Example usage
#     input_html_dir = Path("/Users/ariza/_x/src/static-frame/doc/build/html/")
#     output_md_dir = Path("path/to/output_dir")
#     convert_directory(input_html_dir, output_md_dir)


