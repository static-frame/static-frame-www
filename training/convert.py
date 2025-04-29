from markitdown import MarkItDown

# result = md.convert("test.xlsx")
# print(result.text_content)

#

import argparse
import os
from pathlib import Path
import shutil

def convert_directory(input_dir: Path, output_dir: Path):
    input_dir = input_dir.resolve()
    output_dir = output_dir.resolve()

    md = MarkItDown(enable_plugins=False) # Set to True to enable plugins

    # Clear output directory if it already exists
    # if output_dir.exists():
    #     shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    for root, dirs, files in os.walk(input_dir):
        for file in files:
            if file.endswith(".html"):
                input_file_path = Path(root) / file

                # Figure out relative path from input_dir
                relative_path = input_file_path.relative_to(input_dir)

                # Change extension from .html -> .md
                output_fp = output_dir / relative_path.with_suffix(".md")
                output_fp.parent.mkdir(parents=True, exist_ok=True)

                # Convert and write
                result = md.convert(str(input_file_path))
                import ipdb; ipdb.set_trace()
                # output_fp.write_text(result.text_content, encoding="utf-8")

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


