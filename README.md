
# Investment Advisor AI

This is an investment advisor chat ai that is able to provide answers to questions an investment advisor may have. The model used is taken from https://github.com/karpathy/nanoGPT.

## install

Dependencies:

- [pytorch](https://pytorch.org) <3
- [numpy](https://numpy.org/install/) <3
- `pip install transformers` for huggingface transformers <3 (to load GPT-2 checkpoints)
- `pip install datasets` for huggingface datasets <3 (if you want to download + preprocess OpenWebText)
- `pip install tiktoken` for OpenAI's fast BPE code <3
- `pip install wandb` for optional logging <3
- `pip install tqdm`

## quick start

First step is to populate input.txt with your training data. Then turn it from raw text into one large stream of integers:

```
$ python data/investmentAdvisor/prepare.py
```

This creates a `train.bin` and `val.bin` in that data directory. Now it is time to train your GPT. The size of it very much depends on the computational resources of your system:

```
$ python train.py config/train_inv_advisor.py
```

Based on the configuration, the model checkpoints are being written into the `--out_dir` directory `out-inv-advisor`. So once the training finishes we can sample from the best model by pointing the sampling script at this directory:

```
$ python sample.py --out_dir=out-inv-advisor
```

Note: this will just generate random blurbs related to our test data. To get to behave more like a chat bot, use `--start` with your query

```
$ python sample.py --out_dir=out-inv-advisor --start="What are some strategies for portfolio diversification?"
```